const mongoose = require('mongoose');

const meetingRequestSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  investorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Declined'],
    default: 'Pending',
  },
  message: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('MeetingRequest', meetingRequestSchema);
