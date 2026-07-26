const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect); // Protect all booking endpoints with JWT token check

router.post('/', authorize('client'), createBooking);
router.get('/my', getMyBookings);

module.exports = router;