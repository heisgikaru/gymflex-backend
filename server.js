const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Mount API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/gyms', require('./routes/gymRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Base Health Check
app.get('/', (req, res) => {
    res.json({ message: "GymFlex Secure Backend API is active!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running securely on port ${PORT}`);
});