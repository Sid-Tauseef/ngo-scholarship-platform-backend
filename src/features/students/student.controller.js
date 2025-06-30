// src/features/students/student.controller.js
const {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('./student.service');
const logger = require('../../utils/logger');

async function getStudentsHandler(req, res, next) {
  try {
    const students = await getAllStudents();
    res.json({ success: true, data: students });
  } catch (err) {
    logger.error(`getStudentsHandler: ${err.message}`);
    next(err);
  }
}

async function createStudentHandler(req, res, next) {
  try {
    const student = await createStudent(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    logger.error(`createStudentHandler: ${err.message}`);
    next(err);
  }
}

async function updateStudentHandler(req, res, next) {
  try {
    const student = await updateStudent(req.params.id, req.body);
    res.json({ success: true, data: student });
  } catch (err) {
    logger.error(`updateStudentHandler: ${err.message}`);
    next(err);
  }
}

async function deleteStudentHandler(req, res, next) {
  try {
    await deleteStudent(req.params.id);
    res.json({ success: true, message: 'Student deleted' });
  } catch (err) {
    logger.error(`deleteStudentHandler: ${err.message}`);
    next(err);
  }
}

module.exports = {
  getStudentsHandler,
  createStudentHandler,
  updateStudentHandler,
  deleteStudentHandler,
};
