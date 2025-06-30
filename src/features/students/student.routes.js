// src/features/students/student.routes.js
const { Router } = require('express');
const {
  getStudentsHandler,
  createStudentHandler,
  updateStudentHandler,
  deleteStudentHandler,
} = require('./student.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { authorize }    = require('../../middleware/rbac.middleware');

const router = Router();

// ADMIN-only endpoints for student management
router.get(
  '/',
  authenticate,
  authorize(['ADMIN']),
  getStudentsHandler
);
router.post(
  '/',
  authenticate,
  authorize(['ADMIN']),
  createStudentHandler
);
router.put(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  updateStudentHandler
);
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  deleteStudentHandler
);

module.exports = router;
