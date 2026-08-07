const Investor = require('../models/Investor');

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
