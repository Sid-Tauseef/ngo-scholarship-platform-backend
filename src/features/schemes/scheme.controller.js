// src/features/schemes/scheme.controller.js
const { createScheme, getAllSchemes,getSchemeById, updateScheme, deleteScheme } = require('./scheme.service');
const { createApplication } = require('../applications/application.service');
const { safeDate } = require('../../utils/dateUtils');


async function createSchemeHandler(req, res, next) {
  try {
    const scheme = await createScheme(req.body);
    res.status(201).json({ success: true, data: scheme });
  } catch (err) {
    next(err);
  }
}

async function getSchemesHandler(req, res, next) {
  try {
    const schemes = await getAllSchemes();
    res.json({ success: true, data: schemes });
  } catch (err) {
    next(err);
  }
}

async function updateSchemeHandler(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await updateScheme(id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Scheme not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteSchemeHandler(req, res, next) {
  try {
    const { id } = req.params;
    await deleteScheme(id);
    res.json({ success: true, message: 'Scheme deleted' });
  } catch (err) {
    next(err);
  }
}


async function getSchemeByIdHandler(req, res, next) {
  try {
    const { id } = req.params;
    const scheme = await getSchemeById(id); // Ensure this is resolved
    
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found',
        data: null // Explicit null data
      });
    }
    
    // Ensure plain JavaScript object
    const plainScheme = scheme.toObject 
      ? scheme.toObject() 
      : scheme;
    
    res.json({
      success: true,
      data: plainScheme
    });
  } catch (err) {
    next(err);
  }
}

// New: handle a student applying to a scheme
async function applyForSchemeHandler(req, res, next) {
  try {
    const schemeId = req.params.id;
    const studentId = req.user.id;     // authenticate must set req.user
    const {
      fullName,
      dateOfBirth,
      phoneNumber,
      address,
      institution,
      gpa,
      familyIncome,
      statement,
      document
    } = req.body;

    const application = await createApplication({
      student: studentId,
      scheme: schemeId,
      fullName,
      dateOfBirth: safeDate(dateOfBirth), // Use the safeDate utility
      phoneNumber,
      address,
      institution,
      gpa,
      familyIncome,
      statement,
      document
    });

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
}

module.exports = { createSchemeHandler, getSchemeByIdHandler, applyForSchemeHandler, getSchemesHandler, updateSchemeHandler, deleteSchemeHandler };