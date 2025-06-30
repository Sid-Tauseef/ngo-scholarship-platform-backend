const mongoose = require('mongoose');

const scholarshipExamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    eligibility_criteria: {
      type: String,
      required: true,
    },
    application_deadline: {
      type: Date,
      required: true,
    },
    exam_date: {
      type: Date,
      required: true,
    },
    duration: {
      type: mongoose.Schema.Types.Mixed, // Accepts string or number
      required: true,
    },
    total_marks: {
      type: Number,
      min: 0,
    },
    number_of_questions: {
      type: Number,
      min: 1,
    },
    mode: {
      type: String,
      enum: ['Online', 'Offline', 'Hybrid'],
      required: true,
    },
    location: {
      type: String,
    },
    documents_required: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.ScholarshipExam || mongoose.model('ScholarshipExam', scholarshipExamSchema);