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
        You are an expert technical resume writer specializing in tailoring resumes for specific job applications. Your task is to intelligently adapt the provided base resume to perfectly match the job description.

        **IMPORTANT INSTRUCTIONS:**

        1. **Analyze Job Requirements**: Carefully read the job description to identify required experience level, key technologies, and specific responsibilities.

        2. **Adapt Experience Dates**: Adjust the "period" fields in experience to reflect appropriate duration based on job requirements (e.g., if job asks for 4+ years, ensure experience spans show adequate time).

        3. **Enhance Projects**: Modify project descriptions and add relevant technical details that align with job requirements. You may add 1-2 new projects if they logically fit the candidate's background and job needs.

        4. **Tailor Content**: Rewrite bullet points to include keywords, technologies, and achievements mentioned in the job description while maintaining authenticity.

        5. **Skills Prioritization**: Reorder skills to prioritize those mentioned in the job description, adding 2-3 relevant skills if they logically fit.

        6. **Maintain Structure**: Keep the exact same JSON structure with "experience", "projects", and "skills" keys.

        **Job Description:**
        \`\`\`
        ${jobDescription}
        \`\`\`

        **Base Resume (JSON format):**
        \`\`\`json
        ${baseResumeString}
        \`\`\`

        **Output Requirements:**
        - Return ONLY valid JSON
        - Structure: { "experience": [...], "projects": [...], "skills": [...] }
        - Adapt dates realistically (don't exceed current year)
        - Add relevant but authentic projects and skills
        - Use job-specific keywords and terminology
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 2000,
      temperature: 0.7,
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