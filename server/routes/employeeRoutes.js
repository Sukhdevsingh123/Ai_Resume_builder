const express = require('express');
const router = express.Router();
const { seedDatabase, getEmployees, addEmployee } = require('../controllers/employeeController');
const { generateResume } = require('../controllers/resumeController');
const uploadResumes = require('../middleware/upload');

// Route to seed the database
router.post('/seed', seedDatabase);

// Route to get all employees
router.get('/employees', getEmployees);

// Use the 'uploadResumes' middleware to handle multiple resume file uploads
router.post('/employees', uploadResumes, addEmployee);

// Route to generate a resume
router.post('/generate-resume', generateResume);

module.exports = router;