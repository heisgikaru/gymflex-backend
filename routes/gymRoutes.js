const express = require('express');
const router = express.Router();
const { createGym, getGyms } = require('../controllers/gymController');

router.route('/')
    .get(getGyms)
    .post(createGym);

module.exports = router;