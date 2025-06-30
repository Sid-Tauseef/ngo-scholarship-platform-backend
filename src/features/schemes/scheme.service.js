// src/features/schemes/scheme.service.js
const Scheme = require('./scheme.model');

async function createScheme(data) {
  const scheme = new Scheme(data);
  return await scheme.save();
}

async function getAllSchemes() {
  return await Scheme.find().sort({ createdAt: -1 });
}

async function updateScheme(id, data) {
  return await Scheme.findByIdAndUpdate(id, data, { new: true });
}

async function deleteScheme(id) {
  return await Scheme.findByIdAndDelete(id);
}


async function getSchemeById(id) {
  const scheme = await Scheme.findById(id).lean(); // Return plain object
  return scheme;
}


module.exports = { createScheme, getAllSchemes, updateScheme, deleteScheme, getSchemeById };