const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  studentId:   { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  instituteId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  examName:    { type: String, required: true },
  status:      { type: String, enum: ['PENDING','APPROVED','REJECTED'], default: 'PENDING' },
  appliedAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.models.Exam || mongoose.model('Exam', examSchema);
