const Student = require('../models/Student');

exports.getProfile = async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId).select('-password');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json(student);
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { university, degreeProgram, graduationYear, technicalSkills, interestedSectors, name } = req.body;
    
    let student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update fields
    if (name !== undefined) student.name = name;
    if (university !== undefined) student.university = university;
    if (degreeProgram !== undefined) student.degreeProgram = degreeProgram;
    if (graduationYear !== undefined) student.graduationYear = graduationYear;
    
    // Skills and sectors are expected to be arrays or comma separated strings
    if (technicalSkills !== undefined) {
      student.technicalSkills = Array.isArray(technicalSkills) 
        ? technicalSkills 
        : technicalSkills.split(',').map(s => s.trim()).filter(Boolean);
    }
    
    if (interestedSectors !== undefined) {
      student.interestedSectors = Array.isArray(interestedSectors)
        ? interestedSectors
        : interestedSectors.split(',').map(s => s.trim()).filter(Boolean);
    }

    await student.save();
    
    // Return updated student without password
    const updatedStudent = await Student.findById(studentId).select('-password');
    res.json({ message: 'Profile updated successfully', profile: updatedStudent });
    
  } catch (error) {
    console.error('Error updating student profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
