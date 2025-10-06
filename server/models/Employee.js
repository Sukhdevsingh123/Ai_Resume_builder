const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  period: String,
  points: [String],
});

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  telegram: String,
  baseResume: {
    experience: [ExperienceSchema],
    projects: [ProjectSchema],
    skills: [String],
  },
});

module.exports = mongoose.model('Employee', EmployeeSchema);