const express = require('express');
const router = express.Router();
const { createGym, getGyms } = require('../controllers/gymController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(getGyms)
    .post(protect, authorize('host'), createGym);

module.exports = router;