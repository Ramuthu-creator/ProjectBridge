const crypto = require('crypto');
const Project = require('../models/Project');

exports.uploadProject = async (req, res) => {
  try {
    const { title, description, industrySector, technologyStack, projectReadinessLevel, studentId } = req.body;

    if (!title || !description || !studentId || !industrySector || !projectReadinessLevel) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const uploadTimestamp = new Date();
    
    // Generate SHA-256 hash for basic IP protection proof
    const dataToHash = `${studentId}-${title}-${uploadTimestamp.toISOString()}`;
    const sha256Hash = crypto.createHash('sha256').update(dataToHash).digest('hex');

    const newProject = new Project({
      title,
      description,
      studentId,
      industrySector,
      technologyStack: technologyStack || [],
      projectReadinessLevel,
      uploadTimestamp,
      sha256Hash,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project uploaded successfully', project: newProject });

  } catch (error) {
    console.error(error);
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
