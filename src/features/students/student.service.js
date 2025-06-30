const bcrypt = require('bcrypt');
const Student = require('./student.model');
const logger = require('../../utils/logger');
const isEmailUnique = require('../../utils/emailCheck'); // Add this import

const SALT_ROUNDS = 10;

async function getAllStudents() {
  logger.info('Fetching all students');
  return Student.find().sort({ createdAt: -1 });
}

async function createStudent(data) {
  logger.info(`Creating student ${data.email}`);
  
  // Add email uniqueness check
  if (!(await isEmailUnique(data.email))) {
    const err = new Error('Email already in use');
    err.status = 409;
    logger.warn(`Duplicate email: ${data.email}`);
    throw err;
  }

  const existsRoll = await Student.findOne({ rollNumber: data.rollNumber });
  if (existsRoll) {
    const err = new Error('Roll number already exists');
    err.status = 409;
    logger.warn(`Duplicate rollNumber: ${data.rollNumber}`);
    throw err;
  }

  const hashed = await bcrypt.hash(data.password, SALT_ROUNDS);

  const student = new Student({
    name: data.name,
    email: data.email,
    rollNumber: data.rollNumber,
    password: hashed,
    role: 'STUDENT',
  });

  return student.save();
}

async function updateStudent(id, data) {
  logger.info(`Updating student ${id}`);

  const toUpdate = {
    name: data.name,
    email: data.email,
    rollNumber: data.rollNumber,
  };

  // Add email uniqueness check if email is being updated
  if (data.email) {
    const currentStudent = await Student.findById(id);
    if (currentStudent.email !== data.email && !(await isEmailUnique(data.email))) {
      const err = new Error('Email already in use');
      err.status = 409;
      throw err;
    }
  }

  if (data.password) {
    toUpdate.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  }

  const updated = await Student.findByIdAndUpdate(id, toUpdate, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    const err = new Error('Student not found');
    err.status = 404;
    logger.warn(`No student to update: ${id}`);
    throw err;
  }

  return updated;
}

async function deleteStudent(id) {
  logger.info(`Deleting student ${id}`);
  const removed = await Student.findByIdAndDelete(id);
  if (!removed) {
    const err = new Error('Student not found');
    err.status = 404;
    logger.warn(`No student to delete: ${id}`);
    throw err;
  }
  return removed;
}

module.exports = {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
