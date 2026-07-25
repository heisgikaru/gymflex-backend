const mongoose = require('mongoose');

const GymSchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a gym name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    dayPassPrice: {
        type: Number,
        required: [true, 'Please specify day pass price in KSh']
    },
    capacityLimit: {
        type: Number,
        required: [true, 'Please set maximum active guest capacity limit']
    },
    // GeoJSON Point for Leaflet.js map integration and MongoDB geospatial queries
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // Format: [longitude, latitude]
            required: true
        },
        formattedAddress: String
    },
    amenities: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create 2dsphere index for spatial queries ($near)
GymSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Gym', GymSchema);