const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Project = require('../models/Project');

exports.uploadProject = async (req, res) => {
  try {
    const { title, description, industrySector, technologyStack, projectReadinessLevel } = req.body;

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'your_temporary_jwt_secret_key';
    const decoded = jwt.verify(token, secret);
    
    if (!decoded.user || !decoded.user.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    const studentId = decoded.user.id;

    if (!title || !description || !studentId || !industrySector || !projectReadinessLevel) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const uploadTimestamp = new Date();
    
    // Generate SHA-256 hash for basic IP protection proof
    const dataToHash = `${studentId}-${title}-${uploadTimestamp.toISOString()}`;
    const sha256Hash = crypto.createHash('sha256').update(dataToHash).digest('hex');

    // Check for uploaded video file
    let demoVideoUrl = null;
    if (req.file) {
      demoVideoUrl = `/uploads/${req.file.filename}`;
    }

    const newProject = new Project({
      title,
      description,
      studentId,
      industrySector,
      technologyStack: typeof technologyStack === 'string' ? technologyStack.split(',').map(s => s.trim()).filter(Boolean) : (technologyStack || []),
      projectReadinessLevel,
      uploadTimestamp,
      sha256Hash,
      demoVideoUrl,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project uploaded successfully', project: newProject });

  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Server error during project upload' });
  }
};

exports.getMatchedProjects = async (req, res) => {
  try {
    const { interestedIndustrySectors, interestedTechStacks } = req.body;

    // Find projects matching at least one of the preferred industries or tech stacks
    const query = {
      $or: [
        { industrySector: { $in: interestedIndustrySectors || [] } },
        { technologyStack: { $in: interestedTechStacks || [] } }
      ]
    };

    // Populate student info (just name and email) for the matched projects
    const projects = await Project.find(query).populate('studentId', 'name email');
    
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching matched projects' });
  }
};

exports.getMyProjects = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'your_temporary_jwt_secret_key';
    const decoded = jwt.verify(token, secret);
    
    if (!decoded.user || !decoded.user.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const studentId = decoded.user.id;
    const projects = await Project.find({ studentId }).sort({ uploadTimestamp: -1 });
    
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Server error while fetching my projects' });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const { industrySector, projectReadinessLevel } = req.query;
    
    // Build filter query
    let query = {};
    if (industrySector) {
      query.industrySector = industrySector;
    }
    if (projectReadinessLevel) {
      query.projectReadinessLevel = projectReadinessLevel;
    }

    // Populate student info for all projects
    const projects = await Project.find(query)
      .populate('studentId', 'name email university degreeProgram graduationYear')
      .sort({ uploadTimestamp: -1 });
      
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching all projects' });
  }
};
