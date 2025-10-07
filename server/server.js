const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: "*", // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api', employeeRoutes);

const PORT =  5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));