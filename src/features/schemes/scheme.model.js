// src/features/schemes/scheme.model.js
const mongoose = require('mongoose');
const schemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  eligibility_criteria: {
    type: String,
    required: true
  },
  application_deadline: {
    type: Date,
    required: true
  },
  exam_date: {
    type: Date,
    required: true
  },
  duration: {
    type: mongoose.Schema.Types.Mixed, // Accept string or number
    required: true
  },
  mode: {
    type: String,
    enum: ['Online', 'Offline', 'Hybrid'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  admitCardUrl: {
    type: String
  }
});
module.exports = mongoose.models.Scheme || mongoose.model('Scheme', schemeSchema);