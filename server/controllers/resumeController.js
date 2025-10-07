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

        **CRITICAL REQUIREMENTS:**

        1. **EXPERIENCE DATES - MUST ADJUST FOR JOB REQUIREMENTS:**
           - If job requires 4+ years experience, ensure experience spans show AT LEAST 4-5 years total
           - Current year is 2024, so adjust dates realistically (e.g., 2019-2024, 2018-2023, etc.)
           - **CRITICAL: Experience dates MUST be in CHRONOLOGICAL order**
           - **Each subsequent job MUST start AFTER the previous job ends**
           - **NO OVERLAPPING dates between experiences**
           - Make dates progressive and realistic - earlier jobs should have earlier dates
           - Calculate total experience to meet job requirements

        2. **EXPERIENCE DATE FORMAT:**
           - Use format: "Jan 2020 – Dec 2022" or "Mar 2021 - Present"
           - Ensure proper chronological progression: Job 1 (earliest) → Job 2 → Job 3 (current)
           - **Example for 4+ years: Jan 2019 – Dec 2022 (Job 1), Jan 2023 - Present (Job 2)**

        3. **RESUME EXPERIENCE ORDER:**
           - **LIST EXPERIENCE IN REVERSE CHRONOLOGICAL ORDER**
           - **Most recent/current job FIRST, then previous jobs**
           - **Current job shows "Present" or current year**
           - **Example order: Current Job (2023-Present) → Previous Job (2019-2022)**

        4. **PROJECTS - MINIMUM 3-4 PROJECTS:**
           - Ensure AT LEAST 3-4 projects in the resume
           - Add 1-2 new projects if needed to reach minimum
           - Each project description must be 40-50 words long
           - Include specific technologies, challenges, and outcomes

        5. **PROJECT DESCRIPTIONS - DETAILED (40-50 WORDS):**
           - Write comprehensive project descriptions (40-50 words each)
           - Include: technologies used, challenges faced, solutions implemented, results achieved
           - Use job-relevant keywords and technical details
           - Show impact and quantifiable results where possible

        6. **SKILLS ENHANCEMENT:**
           - Add job-specific skills if missing
           - Prioritize skills mentioned in job description
           - Maintain authenticity with candidate's background

        **Job Description:**
        \`\`\`
        ${jobDescription}
        \`\`\`

        **Base Resume (JSON format):**
        \`\`\`json
        ${baseResumeString}
        \`\`\`

        **OUTPUT REQUIREMENTS:**
        - Return ONLY valid JSON with structure: { "experience": [...], "projects": [...], "skills": [...] }
        - Experience periods MUST reflect required experience level (4+ years minimum for this job)
        - **Experience dates MUST be in strict chronological order with NO overlaps**
        - **LIST EXPERIENCE IN REVERSE CHRONOLOGICAL ORDER (most recent first)**
        - **Current job (with "Present") comes FIRST, then previous jobs**
        - Minimum 3-4 projects with detailed 40-50 word descriptions
        - Use current year 2024 as reference for date calculations
        - Add relevant technical projects that fit the job requirements
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