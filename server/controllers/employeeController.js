const Employee = require('../models/Employee');
const sampleResume = require('../utils/sampleData');
const pdf = require('pdf-parse');
const OpenAI = require('openai');



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

// Seed the database with sample data
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


const addEmployee = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No resume file uploaded.' });
    }
  
    try {
      // 1. Extract text from the PDF buffer
      const data = await pdf(req.file.buffer);
      const resumeText = data.text;
  
      // 2. Create a prompt for the AI to parse the text
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
  
      // 3. Call OpenAI API to get structured data
      const response = await openai.chat.completions.create({
          model: "gpt-4-turbo",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
      });
      
      const parsedData = JSON.parse(response.choices[0].message.content);
  
      // 4. Create and save the new employee
      const newEmployee = new Employee({
          name: parsedData.name,
          phone: parsedData.phone,
          telegram: parsedData.telegram,
          baseResume: {
              experience: parsedData.experience,
              projects: parsedData.projects,
              skills: parsedData.skills,
          },
      });
  
      const savedEmployee = await newEmployee.save();
      res.status(201).json(savedEmployee);
  
    } catch (error) {
      console.error('Error processing resume:', error);
      res.status(500).json({ message: 'Failed to process resume file.' });
    }
  };


module.exports = {
    seedDatabase,
    getEmployees,
    addEmployee,
};