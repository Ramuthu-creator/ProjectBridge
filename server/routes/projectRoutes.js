const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Upload a new project (Student)
router.post('/upload', projectController.uploadProject);

// Get matched projects based on preferences (Investor)
router.post('/match', projectController.getMatchedProjects);
// Get my projects
router.get('/my-projects', projectController.getMyProjects);

// Get all projects (with optional filters)
router.get('/all', projectController.getAllProjects);

module.exports = router;
