const Institute = require('./institute.model');
const logger = require('../../utils/logger');
const isEmailUnique = require('../../utils/emailCheck'); // Add this import

async function getAllInstitutes() {
  logger.info('Fetching all institutes from DB');
  return Institute.find().sort({ createdAt: -1 }).select('-password');
}

async function createInstitute(data) {
  logger.info(`Creating institute with email: ${data.email}`);

  // Add email uniqueness check
  if (!(await isEmailUnique(data.email))) {
    const err = new Error('Email already in use');
    err.status = 409;
    logger.warn(`Duplicate email for institute: ${data.email}`);
    throw err;
  }

  const requiredFields = ['name', 'email', 'address', 'password'];
  for (const field of requiredFields) {
    if (!data[field]) {
      const err = new Error(`${field} is required`);
      err.status = 400;
      throw err;
    }
  }

  const institute = new Institute(data);
  return institute.save();
}

async function updateInstitute(id, data) {
  logger.info(`Updating institute ${id}`);

  // Don't allow password update through this route
  if ('password' in data) delete data.password;

  // Add email uniqueness check if email is being updated
  if (data.email) {
    const currentInstitute = await Institute.findById(id);
    if (currentInstitute.email !== data.email && !(await isEmailUnique(data.email))) {
      const err = new Error('Email already in use');
      err.status = 409;
      throw err;
    }
  }

  const updated = await Institute.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    const err = new Error('Institute not found');
    err.status = 404;
    logger.warn(`No institute found to update: ${id}`);
    throw err;
  }

  return updated;
}

async function deleteInstitute(id) {
  logger.info(`Deleting institute ${id}`);
  const removed = await Institute.findByIdAndDelete(id);
  if (!removed) {
    const err = new Error("Institute not found");
    err.status = 404;
    logger.warn(`No institute found to delete: ${id}`);
    throw err;
  }
  return removed;
}

module.exports = {
  getAllInstitutes,
  createInstitute,
  updateInstitute,
  deleteInstitute,
};
