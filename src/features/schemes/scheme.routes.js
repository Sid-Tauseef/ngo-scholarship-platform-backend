// src/features/schemes/scheme.routes.js
const { Router } = require('express');
const { authenticate } = require('../../middleware/auth.middleware');
const { authorize } = require('../../middleware/rbac.middleware');
const {
  createSchemeHandler,
  getSchemesHandler,
  updateSchemeHandler,
  deleteSchemeHandler,
  getSchemeByIdHandler,
  applyForSchemeHandler
} = require('./scheme.controller');

const router = Router();

// Admin-only create
router.post('/', authenticate, authorize(['ADMIN']), createSchemeHandler);

// List (open to ADMIN, INSTITUTE, MEMBER, STUDENT)
router.get('/',getSchemesHandler);

// Single scheme (open)
router.get('/:id', getSchemeByIdHandler);

// **Student applies here**
router.post('/:id/apply', authenticate, authorize(['STUDENT']), applyForSchemeHandler);

// Update & delete stay admin-only
router.put('/:id', authenticate, authorize(['ADMIN']), updateSchemeHandler);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteSchemeHandler);

module.exports = router;