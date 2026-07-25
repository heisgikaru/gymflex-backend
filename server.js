const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Database Connection Module
const connectDB = require('./config/db');

const app = express();

// 1. Connect to MongoDB Atlas Cloud Database
connectDB();

// 2. Middleware Configuration
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads

// 3. Mount Application API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/gyms', require('./routes/gymRoutes'));

// Base Health Check Verification Route
app.get('/', (req, res) => {
    res.json({ message: "GymFlex Secure Backend API is active!" });
});

// 4. Start Server Listener
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running securely on port ${PORT}`);
});