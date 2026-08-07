const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/authMiddleware');

// Get current student's profile
router.get('/profile', auth, studentController.getProfile);

// Update current student's profile
router.put('/profile', auth, studentController.updateProfile);

module.exports = router;
