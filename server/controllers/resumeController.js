const Employee = require('../models/Employee');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateResume = async (req, res) => {
  const { employeeId, jobDescription } = req.body;

  if (!employeeId || !jobDescription) {
    return res.status(400).json({ message: 'Employee ID and Job Description are required.' });
  }

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    const baseResumeString = JSON.stringify(employee.baseResume);

    const prompt = `
        You are an expert technical resume writer. Your task is to rewrite the 'experience', 'projects', and 'skills' sections of the following base resume to perfectly align with the provided job description.

        **Instructions:**
        1.  Analyze the **Job Description** to identify key skills, technologies, and responsibilities.
        2.  Rewrite the bullet points in the **Base Resume**'s 'experience' and 'projects' sections to highlight the most relevant aspects. Use action verbs and keywords from the job description.
        3.  Do NOT invent new experiences, jobs, or projects. Only rephrase and tailor the existing content.
        4.  Re-order the 'skills' list to prioritize the skills mentioned in the job description.
        5.  The output MUST be a valid JSON object with three keys: "experience", "projects", and "skills". The structure must match the input base resume structure.

        **Job Description:**
        \`\`\`
        ${jobDescription}
        \`\`\`

        **Base Resume (JSON format):**
        \`\`\`json
        ${baseResumeString}
        \`\`\`

        **Output (JSON format only):**
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: "json_object" },
    });
    
    const tailoredResume = JSON.parse(response.choices[0].message.content);
    
    // Combine original data with new AI-generated data
    const finalResume = {
      name: employee.name,
      phone: employee.phone,
      telegram: employee.telegram,
      ...tailoredResume
    };

    res.json(finalResume);

  } catch (error) {
    console.error('Error generating resume:', error);
    res.status(500).json({ message: 'Failed to generate resume' });
  }
};

module.exports = { generateResume };