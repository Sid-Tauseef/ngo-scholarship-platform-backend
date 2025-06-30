// src/features/users/user.service.js
const bcrypt = require('bcrypt');
const User   = require('./user.model');
const SALT   = 10;

// Create a new user (any role)
async function createUser({ name, email, password, role, profile }) {
  const hashed = await bcrypt.hash(password, SALT);
  return User.create({ name, email, password: hashed, role, profile });
}

// Get all users of a given role
async function getAllByRole(role) {
  return User.find({ role }).sort({ createdAt: -1 });
}

// Update user
async function updateUser(id, { name, email, password, profile }) {
  const update = { name, email, profile };
  if (password) {
    update.password = await bcrypt.hash(password, SALT);
  }
  const updated = await User.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
    context: 'query'
  });
  if (!updated) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return updated;
}

// Delete user
async function deleteUser(id) {
  const removed = await User.findByIdAndDelete(id);
  if (!removed) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return removed;
}

module.exports = { createUser, getAllByRole, updateUser, deleteUser };
