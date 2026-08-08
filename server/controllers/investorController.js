const Investor = require('../models/Investor');
const Project = require('../models/Project');
const MeetingRequest = require('../models/MeetingRequest');

exports.getProfile = async (req, res) => {
  try {
    const investor = await Investor.findById(req.user.id).select('-password');
    if (!investor) {
      return res.status(404).json({ message: 'Investor not found' });
    }
    res.json(investor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { companyName, interestedIndustrySectors, interestedTechStacks } = req.body;
    
    // Convert comma-separated strings to arrays if they are strings, otherwise keep them as arrays if already processed
    const processArray = (val) => {
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') return val.split(',').map(s => s.trim()).filter(Boolean);
      return [];
    };

    const updatedFields = {
      companyName,
      interestedIndustrySectors: processArray(interestedIndustrySectors),
      interestedTechStacks: processArray(interestedTechStacks)
    };

    const investor = await Investor.findByIdAndUpdate(
      req.user.id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!investor) {
      return res.status(404).json({ message: 'Investor not found' });
    }
    
    res.json(investor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

exports.saveProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const investor = await Investor.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { savedProjects: projectId } },
      { new: true }
    ).select('-password');
    
    if (!investor) return res.status(404).json({ message: 'Investor not found' });
    res.json({ message: 'Project saved successfully', savedProjects: investor.savedProjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving project' });
  }
};

exports.unsaveProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const investor = await Investor.findByIdAndUpdate(
      req.user.id,
      { $pull: { savedProjects: projectId } },
      { new: true }
    ).select('-password');

    if (!investor) return res.status(404).json({ message: 'Investor not found' });
    res.json({ message: 'Project removed from saved', savedProjects: investor.savedProjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error unsaving project' });
  }
};

exports.getSavedProjects = async (req, res) => {
  try {
    const investor = await Investor.findById(req.user.id)
      .populate('savedProjects')
      .select('savedProjects');
      
    if (!investor) return res.status(404).json({ message: 'Investor not found' });
    res.json(investor.savedProjects || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching saved projects' });
  }
};

exports.requestMeeting = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const investorId = req.user.id;
    
    // Check if project exists to get studentId
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check for existing request
    const existingRequest = await MeetingRequest.findOne({ projectId, investorId });
    if (existingRequest) {
      return res.status(400).json({ message: 'Meeting already requested for this project' });
    }
    
    const meetingRequest = new MeetingRequest({
      projectId,
      investorId,
      studentId: project.studentId
    });
    
    await meetingRequest.save();
    
    res.status(201).json({ message: 'Meeting requested successfully', meetingRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error requesting meeting' });
  }
};
