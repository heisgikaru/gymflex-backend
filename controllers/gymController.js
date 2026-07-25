const Gym = require('../models/Gym');

// @desc    Create a new Gym listing (Hosts only)
// @route   POST /api/gyms
// @access  Private (Host)
exports.createGym = async (req, res) => {
    try {
        const { name, description, dayPassPrice, capacityLimit, longitude, latitude, address, amenities } = req.body;

        const gym = await Gym.create({
            host: req.body.hostId || req.user?._id, // References the host user
            name,
            description,
            dayPassPrice,
            capacityLimit,
            location: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)],
                formattedAddress: address
            },
            amenities
        });

        res.status(201).json({ success: true, data: gym });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all gyms or search nearby gyms using coordinates
// @route   GET /api/gyms
// @access  Public
exports.getGyms = async (req, res) => {
    try {
        const { lng, lat, maxDistanceInKm } = req.query;

        // If coordinates are provided, perform MongoDB Geospatial Query ($near)
        if (lng && lat) {
            const distanceInMeters = (maxDistanceInKm || 10) * 1000; // Default 10km radius

            const nearbyGyms = await Gym.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [parseFloat(lng), parseFloat(lat)]
                        },
                        $maxDistance: distanceInMeters
                    }
                }
            });

            return res.json({ success: true, count: nearbyGyms.length, data: nearbyGyms });
        }

        // Fetch all gyms if no location search params sent
        const gyms = await Gym.find();
        res.json({ success: true, count: gyms.length, data: gyms });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};