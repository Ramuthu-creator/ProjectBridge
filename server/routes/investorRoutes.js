const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investorController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all routes with authMiddleware
router.use(authMiddleware);

// Profile routes
router.get('/profile', investorController.getProfile);
router.put('/profile', investorController.updateProfile);

module.exports = router;
