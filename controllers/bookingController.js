const Booking = require('../models/Booking');
const Gym = require('../models/Gym');

// @desc    Create a new pass booking with real-time Capacity Limit Check
// @route   POST /api/bookings
// @access  Private (Clients)
exports.createBooking = async (req, res) => {
    try {
        const { gymId, bookingDate } = req.body;

        // 1. Verify Gym exists
        const gym = await Gym.findById(gymId);
        if (!gym) {
            return res.status(404).json({ success: false, message: 'Gym not found' });
        }

        // 2. Real-time Capacity Check for requested date
        const targetDate = new Date(bookingDate);
        const startOfDay = new Date(targetDate.setHours(0,0,0,0));
        const endOfDay = new Date(targetDate.setHours(23,59,59,999));

        const activeBookingsCount = await Booking.countDocuments({
            gym: gymId,
            status: 'confirmed',
            bookingDate: { $gte: startOfDay, $lte: endOfDay }
        });

        // Reject if gym is at capacity limit
        if (activeBookingsCount >= gym.capacityLimit) {
            return res.status(400).json({
                success: false,
                message: `Booking failed: Gym has reached its maximum capacity of ${gym.capacityLimit} guests for this date.`
            });
        }

        // 3. Save Booking
        const booking = await Booking.create({
            gym: gymId,
            user: req.user.id,
            bookingDate,
            passPrice: gym.dayPassPrice
        });

        res.status(201).json({
            success: true,
            data: booking,
            remainingCapacity: gym.capacityLimit - (activeBookingsCount + 1)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user's active bookings
// @route   GET /api/bookings/my
// @access  Private
exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('gym', 'name location dayPassPrice');
        res.json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};