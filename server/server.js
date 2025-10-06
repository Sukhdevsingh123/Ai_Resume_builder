const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', employeeRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));