const bcrypt = require('bcrypt');
const Member = require('./member.model');
const logger = require('../../utils/logger');
const isEmailUnique = require('../../utils/emailCheck'); // Add this import

const SALT_ROUNDS = 10;

async function getAllMembers() {
  logger.info('Fetching all members from DB');
  return Member.find({ role: 'MEMBER' }).sort({ createdAt: -1 });
}

async function createMember(data) {
  logger.info(`Creating member with email: ${data.email}`);
  
  // Add email uniqueness check
  if (!(await isEmailUnique(data.email))) {
    const err = new Error('Email already in use');
    err.status = 409;
    logger.warn(`Attempt to create duplicate member: ${data.email}`);
    throw err;
  }

  const hashed = await bcrypt.hash(data.password, SALT_ROUNDS);
  const member = new Member({ ...data, password: hashed });
  return member.save();
}

async function updateMember(id, data) {
  logger.info(`Updating member ${id}`);
  const toUpdate = {
    name: data.name,
    email: data.email,
  };
  
  // Add email uniqueness check if email is being updated
  if (data.email) {
    const currentMember = await Member.findById(id);
    if (currentMember.email !== data.email && !(await isEmailUnique(data.email))) {
      const err = new Error('Email already in use');
      err.status = 409;
      throw err;
    }
  }

  if (data.password) {
    toUpdate.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  }

  const updated = await Member.findByIdAndUpdate(id, toUpdate, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    const err = new Error('Member not found');
    err.status = 404;
    logger.warn(`No member found to update: ${id}`);
    throw err;
  }
  return updated;
}

async function deleteMember(id) {
  logger.info(`Deleting member ${id}`);
  const removed = await Member.findByIdAndDelete(id);
  if (!removed) {
    const err = new Error('Member not found');
    err.status = 404;
    logger.warn(`No member found to delete: ${id}`);
    throw err;
  }
  return removed;
}

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
};
