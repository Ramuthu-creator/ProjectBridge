const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investorController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all routes with authMiddleware
router.use(authMiddleware);

// Profile routes
router.get('/profile', investorController.getProfile);
router.put('/profile', investorController.updateProfile);

// Saved Projects routes
router.get('/saved-projects', investorController.getSavedProjects);
router.post('/saved-projects/:id', investorController.saveProject);
router.delete('/saved-projects/:id', investorController.unsaveProject);

// Meeting Requests
router.post('/request-meeting/:projectId', investorController.requestMeeting);

module.exports = router;
