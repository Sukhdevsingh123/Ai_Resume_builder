const express = require('express');
const router = express.Router();
const { seedDatabase, getEmployees, addEmployee } = require('../controllers/employeeController');
const { generateResume } = require('../controllers/resumeController');
const upload = require('../middleware/upload');

// Route to seed the database
router.post('/seed', seedDatabase);

// Route to get all employees
router.get('/employees', getEmployees);

// Use the 'upload' middleware to handle a single file upload from a field named 'resume'
router.post('/employees', upload.single('resume'), addEmployee);


// Route to generate a resume
router.post('/generate-resume', generateResume);

module.exports = router;