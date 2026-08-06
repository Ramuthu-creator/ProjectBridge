const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Upload a new project (Student)
router.post('/upload', projectController.uploadProject);

// Get matched projects based on preferences (Investor)
router.post('/match', projectController.getMatchedProjects);

module.exports = router;
