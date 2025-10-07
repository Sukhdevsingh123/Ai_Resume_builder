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
        You are an expert technical resume writer specializing in tailoring resumes for specific job applications. Your task is to intelligently adapt the provided base resume to PERFECTLY match the job description.

        **CRITICAL REQUIREMENTS - MUST FOLLOW EXACTLY:**

        1. **JOB DESCRIPTION MATCHING:**
           - Analyze the job description CAREFULLY and identify ALL required technologies, frameworks, and skills
           - Replace or modify ALL existing content to match the job requirements
           - Use EXACT terminology from the job description
           - Ensure EVERY aspect of the resume aligns with the job requirements
           - **IMPORTANT: Keep existing company names UNCHANGED**

        2. **COMPANY NAME PRESERVATION:**
           - **DO NOT change company names based on job description**
           - Current company name (Techsteck Solutions) must remain exactly the same
           - Previous company names should also remain unchanged
           - Only adapt job titles, technologies, and content to match job requirements

        3. **EXPERIENCE DATES - MUST ADJUST FOR JOB REQUIREMENTS:**
           - If job requires 4+ years experience, ensure experience spans show AT LEAST 4-5 years total
           - Current year is 2024, so adjust dates realistically (e.g., 2019-2024, 2018-2023, etc.)
           - **CRITICAL: Experience dates MUST be in CHRONOLOGICAL order**
           - **Each subsequent job MUST start AFTER the previous job ends**
           - **NO OVERLAPPING dates between experiences**
           - Make dates progressive and realistic - earlier jobs should have earlier dates
           - Calculate total experience to meet job requirements

        4. **EXPERIENCE DATE FORMAT:**
           - Use format: "Jan 2020 – Dec 2022" or "Mar 2021 - Present"
           - Ensure proper chronological progression: Job 1 (earliest) → Job 2 → Job 3 (current)
           - **Example for 4+ years: Jan 2019 – Dec 2022 (Job 1), Jan 2023 - Present (Job 2)**

        5. **RESUME EXPERIENCE ORDER:**
           - **LIST EXPERIENCE IN REVERSE CHRONOLOGICAL ORDER**
           - **Most recent/current job FIRST, then previous jobs**
           - **Current job shows "Present" or current year**
           - **Example order: Current Job (2023-Present) → Previous Job (2019-2022)**

        6. **CONTENT ADAPTATION - REPLACE WITH JOB-SPECIFIC CONTENT:**
           - **COMPLETELY REWRITE** experience bullet points to match job responsibilities
           - Use the EXACT technologies mentioned in the job description
           - Replace any mismatched technologies (e.g., if job requires Python, use Python/Django/Flask)
           - Ensure ALL bullet points reflect the job's key responsibilities
           - Make the experience directly relevant to the job requirements
           - **KEEP COMPANY NAMES UNCHANGED**

        7. **PROJECTS - MINIMUM 3-4 PROJECTS:**
           - Ensure AT LEAST 3-4 projects in the resume
           - **COMPLETELY REWRITE** projects to use job-relevant technologies
           - Each project description must be 40-50 words long
           - Include specific technologies, challenges, and outcomes from the job description

        8. **PROJECT DESCRIPTIONS - DETAILED (40-50 WORDS):**
           - Write comprehensive project descriptions (40-50 words each)
           - Include: technologies used, challenges faced, solutions implemented, results achieved
           - Use job-relevant keywords and technical details
           - Show impact and quantifiable results where possible

        9. **SKILLS - JOB-SPECIFIC SKILLS ONLY:**
           - **REPLACE** existing skills with skills from the job description
           - Prioritize skills mentioned in the job requirements
           - Add any missing job-required skills
           - Remove any skills not relevant to the job
           - Order skills by relevance to the job description

        **SPECIFIC JOB ANALYSIS:**
        - Job requires: Python development, Django/Flask/FastAPI frameworks, REST API design
        - Job requires: Object-oriented programming, database integration (PostgreSQL, MySQL, MongoDB)
        - Job requires: Git, Docker, CI/CD tools, cloud platforms (AWS/Azure/GCP)
        - **CRITICAL: Adapt ALL content to Python development while keeping company names unchanged**

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
        - **COMPLETELY ADAPT ALL CONTENT** to match the job description exactly
        - **KEEP ALL COMPANY NAMES UNCHANGED** (Techsteck Solutions must remain as current company)
        - Experience periods MUST reflect required experience level (2+ years minimum for this job)
        - **Experience dates MUST be in strict chronological order with NO overlaps**
        - **LIST EXPERIENCE IN REVERSE CHRONOLOGICAL ORDER (most recent first)**
        - **Current job (with "Present") comes FIRST, then previous jobs**
        - **REPLACE technologies to match job requirements (Python instead of other languages)**
        - Minimum 3-4 projects with detailed 40-50 word descriptions using job technologies
        - Skills must match job requirements exactly
        - Use current year 2024 as reference for date calculations
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