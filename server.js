const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Import the database connection function
const connectDB = require('./config/db');

const app = express();

// 2. Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
    res.json({ message: "GymFlex Secure Backend API is active!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running securely on port ${PORT}`);
});