const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Upload a new project (Student)
router.post('/upload', upload.single('demoVideo'), projectController.uploadProject);

// Get matched projects based on preferences (Investor)
router.post('/match', projectController.getMatchedProjects);
// Get my projects
router.get('/my-projects', projectController.getMyProjects);

// Get all projects (with optional filters)
router.get('/all', projectController.getAllProjects);

module.exports = router;
