// ngo-scholarship-platform-backend/src/features/scholarship-exams/scholarship-exam.service.js

const ScholarshipExam = require('./scholarship-exam.model');
const logger = require('../../utils/logger');
const Exam = require('../exams/exam.model'); // Assuming you have an application model

async function createScholarshipExam(data) {
  const exam = new ScholarshipExam(data);
  await exam.save();
  logger.info(`Scholarship exam created: ${exam.title}`);
  return exam;
}

async function getAllScholarshipExams() {
  return await ScholarshipExam.find().sort({ createdAt: -1 }).lean();
}

async function getScholarshipExamById(id) {
  return await ScholarshipExam.findById(id).lean();
}

async function updateScholarshipExam(id, data) {
  return await ScholarshipExam.findByIdAndUpdate(id, data, { new: true });
}

async function deleteScholarshipExam(id) {
  await ScholarshipExam.findByIdAndDelete(id);
  return { success: true };
}

async function applyToScholarshipExam(examId, studentId) {
  const application = new Application({
    examId,
    studentId,
    status: 'PENDING'
  });
  await application.save();
  return application;
}

async function updateExamStatus(examId, status) {
  return await ScholarshipExam.findByIdAndUpdate(
    examId,
    { status },
    { new: true }
  );
}

module.exports = {
  createScholarshipExam,
  getAllScholarshipExams,
  getScholarshipExamById,
  updateScholarshipExam,
  deleteScholarshipExam,
  applyToScholarshipExam,
  updateExamStatus
};