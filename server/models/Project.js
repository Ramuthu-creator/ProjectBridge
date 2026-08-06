const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  industrySector: {
    type: String,
    required: true,
  },
  technologyStack: [{
    type: String,
  }],
  projectReadinessLevel: {
    type: String,
    enum: ['Idea', 'Prototype', 'MVP', 'Completed'],
    required: true,
  },
  uploadTimestamp: {
    type: Date,
    default: Date.now,
  },
  sha256Hash: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
