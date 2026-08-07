const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Student',
  },
  university: {
    type: String,
    default: '',
  },
  degreeProgram: {
    type: String,
    default: '',
  },
  graduationYear: {
    type: Number,
  },
  technicalSkills: {
    type: [String],
    default: [],
  },
  interestedSectors: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
