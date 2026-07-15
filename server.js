const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Security Middleware
app.use(cors());
app.use(express.json()); // Sanitizes and parses incoming request bodies

// Baseline test route
app.get('/', (req, res) => {
    res.json({ message: "GymFlex Secure Backend is operational!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running securely on port ${PORT}`);
});