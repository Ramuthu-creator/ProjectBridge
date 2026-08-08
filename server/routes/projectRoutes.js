const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');

// No local upload directory needed anymore for Vercel

// Protected routes below
router.use(authMiddleware);

// Upload a new project (Student)
router.post('/upload', projectController.uploadProject);

// Get matched projects based on preferences (Investor)
router.post('/match', projectController.getMatchedProjects);
// Get my projects
router.get('/my-projects', projectController.getMyProjects);

// Get all projects (with optional filters)
router.get('/all', projectController.getAllProjects);

// Delete a project (Student)
router.delete('/:id', projectController.deleteProject);

module.exports = router;
