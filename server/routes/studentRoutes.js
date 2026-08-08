const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/authMiddleware');

// Get current student's profile
router.get('/profile', auth, studentController.getProfile);

// Update current student's profile
router.put('/profile', auth, studentController.updateProfile);

// Get meeting requests for the logged-in student
router.get('/meetings', auth, studentController.getMeetingRequests);

// Update status of a meeting request (Accept/Decline)
router.put('/meetings/:id', auth, studentController.updateMeetingStatus);

module.exports = router;
