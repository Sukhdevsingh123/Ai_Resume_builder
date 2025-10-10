const Employee = require('../models/Employee');
const sampleResume = require('../utils/sampleData');
const pdf = require('pdf-parse');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


const seedDatabase = async (req, res) => {
    try {
        await Employee.deleteMany({}); // Clear existing data
        await Employee.create(sampleResume);
        res.status(201).json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Error seeding database:', error);
        res.status(500).json({ error: 'Failed to seed database' });
    }
};

// Get all employees (only name and id)
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().select('name');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees' });
    }
};

const parseResumeText = async (resumeText) => {
    console.log('Sending resume text to OpenAI, text length:', resumeText.length);

    const prompt = `
        You are an expert resume parsing AI. Your task is to extract structured information from the raw text of a resume and return it as a valid JSON object.

        The JSON object MUST have the following keys: "name", "phone", "telegram", "experience", "projects", and "skills".

        - "name": The full name of the person.
        - "phone": The phone number. If not found, return an empty string.
        - "telegram": The Telegram handle. If not found, return an empty string.
        - "experience": An array of objects. Each object must have "company", "role", "period", and "points" (an array of strings for bullet points).
        - "projects": An array of objects. Each object must have "name" and "description".
        - "skills": An array of strings.

        Analyze the following resume text and provide ONLY the structured JSON object.

        Resume Text:
        \`\`\`
        ${resumeText}
        \`\`\`
    `;

    console.log('Making OpenAI API call...');
    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_tokens: 1500,
        temperature: 0.3,
    });

    console.log('OpenAI API call completed');
    return JSON.parse(response.choices[0].message.content);
};

const addEmployee = async (req, res) => {
    // Set a timeout for the entire operation
    const timeout = setTimeout(() => {
        console.error('Employee processing timed out after 5 minutes');
        return res.status(408).json({ message: 'Processing timeout. Please try again.' });
    }, 5 * 60 * 1000); // 5 minutes

    try {
        console.log('Received files:', req.files);
        console.log('File keys:', Object.keys(req.files || {}));

        const { freelanceFile, techstackFile } = req.files;

        if (!freelanceFile && !techstackFile) {
            clearTimeout(timeout);
            return res.status(400).json({ message: 'At least one resume file must be uploaded.' });
        }

        console.log('Freelance file size:', freelanceFile ? freelanceFile[0].size : 'No freelance file');
        console.log('Techstack file size:', techstackFile ? techstackFile[0].size : 'No techstack file');

        // Validate file sizes
        if (freelanceFile && freelanceFile[0] && freelanceFile[0].size === 0) {
            clearTimeout(timeout);
            return res.status(400).json({ message: 'Freelance resume file is empty.' });
        }
        if (techstackFile && techstackFile[0] && techstackFile[0].size === 0) {
            clearTimeout(timeout);
            return res.status(400).json({ message: 'TechStack resume file is empty.' });
        }

        let parsedFreelanceData = null;
        let parsedTechstackData = null;

        // Process freelance resume if provided
        if (freelanceFile && freelanceFile[0]) {
            try {
                console.log('Starting PDF parsing for freelance file...');
                // Convert Buffer to Uint8Array for pdf-parse
                const bufferData = new Uint8Array(freelanceFile[0].buffer);
                console.log('Processing freelance file, buffer length:', bufferData.length);

                const freelanceData = await pdf(bufferData);
                console.log('PDF parsing completed for freelance file, extracted text length:', freelanceData.text?.length || 0);

                if (!freelanceData.text || freelanceData.text.trim().length === 0) {
                    throw new Error('No text content found in freelance PDF');
                }

                console.log('Starting AI parsing for freelance resume...');
                parsedFreelanceData = await parseResumeText(freelanceData.text);
                console.log('AI parsing completed for freelance resume');
            } catch (pdfError) {
                console.error('Error parsing freelance PDF:', pdfError);
                clearTimeout(timeout);
                throw new Error('Failed to parse freelance resume PDF');
            }
        }

        // Process techstack resume if provided
        if (techstackFile && techstackFile[0]) {
            try {
                console.log('Starting PDF parsing for techstack file...');
                // Convert Buffer to Uint8Array for pdf-parse
                const bufferData = new Uint8Array(techstackFile[0].buffer);
                console.log('Processing techstack file, buffer length:', bufferData.length);

                const techstackData = await pdf(bufferData);
                console.log('PDF parsing completed for techstack file, extracted text length:', techstackData.text?.length || 0);

                if (!techstackData.text || techstackData.text.trim().length === 0) {
                    throw new Error('No text content found in techstack PDF');
                }

                console.log('Starting AI parsing for techstack resume...');
                parsedTechstackData = await parseResumeText(techstackData.text);
                console.log('AI parsing completed for techstack resume');
            } catch (pdfError) {
                console.error('Error parsing techstack PDF:', pdfError);
                clearTimeout(timeout);
                throw new Error('Failed to parse techstack resume PDF');
            }
        }

        // Create employee with both resume types
        const newEmployee = new Employee({
            name: parsedFreelanceData?.name || parsedTechstackData?.name || 'Unknown',
            phone: parsedFreelanceData?.phone || parsedTechstackData?.phone || '',
            telegram: parsedFreelanceData?.telegram || parsedTechstackData?.telegram || '',
            resumeData: {
                freelance: parsedFreelanceData ? {
                    experience: parsedFreelanceData.experience || [],
                    projects: parsedFreelanceData.projects || [],
                    skills: parsedFreelanceData.skills || [],
                } : null,
                techstack: parsedTechstackData ? {
                    experience: parsedTechstackData.experience || [],
                    projects: parsedTechstackData.projects || [],
                    skills: parsedTechstackData.skills || [],
                } : null,
            },
        });

        console.log('Saving employee to database...');
        const savedEmployee = await newEmployee.save();
        console.log('Employee saved successfully:', savedEmployee._id);

        clearTimeout(timeout);
        res.status(201).json(savedEmployee);

    } catch (error) {
        clearTimeout(timeout);
        console.error('Error processing resume:', error);
        res.status(500).json({ message: 'Failed to process resume file(s).' });
    }
};

module.exports = {
    seedDatabase,
    getEmployees,
    addEmployee,
};