const Exam = require('./exam.model');

// Student applies for an exam
async function applyForExam({ studentId, instituteId, examName }) {
  const exam = new Exam({
    studentId,
    instituteId,
    examName
  });
  return await exam.save();
}

// Fetch exams applied by a student
async function getExamsByStudent(studentId) {
  return await Exam.find({ studentId }).populate('instituteId', 'name email');
}

// Fetch exams submitted to an institute
async function getExamsByInstitute(instituteId) {
  return await Exam.find({ instituteId }).populate('studentId', 'name email');
}

// Admin gets all exams
async function getAllExams() {
  return await Exam.find()
    .populate('studentId', 'name email role')
    .populate('instituteId', 'name email role');
}

// Institute/Admin updates status of an exam
async function updateExamStatus(examId, status) {
    return await Exam.findByIdAndUpdate(
      examId,
      { status },
      { new: true }
    )
    .populate('studentId', 'name email')
    .populate('instituteId', 'name email');
  }
  

module.exports = {
  applyForExam,
  getExamsByStudent,
  getExamsByInstitute,
  getAllExams,
  updateExamStatus
};
