const {
    applyForExam,
    getExamsByStudent,
    getExamsByInstitute,
    getAllExams,
    updateExamStatus
  } = require('./exam.service');
  
  // Institute/Admin updates exam status
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
  }
  
  
  // Student applies for exam
  async function applyForExamHandler(req, res, next) {
    try {
      const studentId = req.user.id;
      const { examName, instituteId } = req.body;
  
      const exam = await applyForExam({ studentId, instituteId, examName });
      res.status(201).json({ success: true, data: exam });
    } catch (err) {
      next(err);
    }
  }
  
  // Student views their applied exams
  async function getStudentExamsHandler(req, res, next) {
    try {
      const studentId = req.user.id;
      const exams = await getExamsByStudent(studentId);
      res.json({ success: true, data: exams });
    } catch (err) {
      next(err);
    }
  }
  
  // Institute views exams applied to them
  async function getInstituteExamsHandler(req, res, next) {
    try {
      const instituteId = req.user.id;
      const exams = await getExamsByInstitute(instituteId);
      res.json({ success: true, data: exams });
    } catch (err) {
      next(err);
    }
  }
  
  // Admin views all exams
  async function getAllExamsHandler(req, res, next) {
    try {
      const exams = await getAllExams();
      res.json({ success: true, data: exams });
    } catch (err) {
      next(err);
    }
  }
  
  module.exports = {
    applyForExamHandler,
    getStudentExamsHandler,
    getInstituteExamsHandler,
    getAllExamsHandler,
    updateExamStatusHandler  
  };
  