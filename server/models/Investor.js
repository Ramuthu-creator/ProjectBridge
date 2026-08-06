const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
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
    default: 'Investor',
  },
  companyName: {
    type: String,
    required: true,
  },
  interestedIndustrySectors: [{
    type: String,
  }],
  interestedTechStacks: [{
    type: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Investor', investorSchema);
