const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scheme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scheme',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  gpa: {
    type: Number,
    required: true
  },
  familyIncome: {
    type: Number,
    required: true
  },
  statement: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

// In application.model.js, before exporting the model

applicationSchema.index({ student: 1, scheme: 1 }, { unique: true });

module.exports = mongoose.models.Application || 
                 mongoose.model('Application', applicationSchema);