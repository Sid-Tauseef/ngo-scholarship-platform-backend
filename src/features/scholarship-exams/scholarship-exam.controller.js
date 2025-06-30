// ngo-scholarship-platform-backend/src/features/scholarship-exams/scholarship-exam.controller.js

const {
  createScholarshipExam,
  getAllScholarshipExams,
  getScholarshipExamById,
  updateScholarshipExam,
  deleteScholarshipExam,
  applyToScholarshipExam,
  updateExamStatus
} = require('./scholarship-exam.service');


async function createScholarshipExamHandler(req, res, next) {
  try {
    const exam = await createScholarshipExam(req.body);
    res.status(201).json({ success: true, data: exam });
  } catch (err) {
    next(err);
  }
}

async function getAllScholarshipExamsHandler(req, res, next) {
  try {
    const exams = await getAllScholarshipExams();
    res.json({ success: true, data: exams });
  } catch (err) {
    next(err);
  }
}

async function getScholarshipExamByIdHandler(req, res, next) {
  try {
    const exam = await getScholarshipExamById(req.params.id);
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });
    res.json({ success: true, data: exam });
  } catch (err) {
    next(err);
  }
}

async function updateScholarshipExamHandler(req, res, next) {
  try {
    const updated = await updateScholarshipExam(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteScholarshipExamHandler(req, res, next) {
  try {
    await deleteScholarshipExam(req.params.id);
    res.json({ success: true, message: 'Exam deleted' });
  } catch (err) {
    next(err);
  }
}

async function applyToScholarshipExamHandler(req, res, next) {
  try {
    const application = await applyToScholarshipExam(req.params.id, req.user.id);
    res.status(201).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
}
async function updateExamStatusHandler(req, res, next) {
  try {
    const { examId } = req.params;
    const { status } = req.body;
    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }
    const updatedExam = await updateExamStatus(examId, status);
    if (!updatedExam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }
    res.json({ success: true, data: updatedExam });
  } catch (err) {
    next(err);
  }
} // ✅ Closing brace added here

module.exports = {
  createScholarshipExamHandler,
  getAllScholarshipExamsHandler,
  getScholarshipExamByIdHandler,
  updateScholarshipExamHandler,
  deleteScholarshipExamHandler,
  applyToScholarshipExamHandler,
  updateExamStatusHandler
};