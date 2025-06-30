// ngo-scholarship-platform-backend/src/features/scholarship-exams/scholarship-exam.routes.js

const { Router } = require('express');
const { authenticate } = require('../../middleware/auth.middleware');
const { authorize } = require('../../middleware/rbac.middleware');
const { body, validationResult } = require('express-validator');

const {
  createScholarshipExamHandler,
  getAllScholarshipExamsHandler,
  getScholarshipExamByIdHandler,
  updateScholarshipExamHandler,
  deleteScholarshipExamHandler,
  applyToScholarshipExamHandler,
  updateExamStatusHandler
} = require('./scholarship-exam.controller');

// Validation rules
const validateCreateScholarshipExam = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a non-negative number'),
  body('eligibility_criteria').notEmpty().withMessage('Eligibility criteria is required'),
  body('application_deadline').isISO8601().toDate().withMessage('Valid application deadline is required'),
  body('exam_date').isISO8601().toDate().withMessage('Valid exam date is required'),
  body('duration').notEmpty().withMessage('Duration is required'),
  body('mode').isIn(['Online', 'Offline', 'Hybrid']).withMessage('Invalid mode'),
  body('total_marks').optional().isInt({ min: 0 }).toInt(),
  body('number_of_questions').optional().isInt({ min: 1 }).toInt(),
  body('location').optional().trim(),
  body('documents_required').optional().isArray(),
];

// Middleware to handle validation
function validate(rules) {
  return async (req, res, next) => {
    await Promise.all(rules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((e) => e.msg),
      });
    }
    next();
  };
}

const router = Router();

// CRUD operations
router.post(
  '/',
  authenticate,
  authorize(['ADMIN']),
  validate(validateCreateScholarshipExam),
  createScholarshipExamHandler
);

router.get(
  '/', 
  getAllScholarshipExamsHandler
);

router.get(
  '/:id',
  getScholarshipExamByIdHandler
);

router.patch(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  validate([...validateCreateScholarshipExam]), // Reuse same validation
  updateScholarshipExamHandler
);

router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  deleteScholarshipExamHandler
);

// Application handling
router.post(
  '/:id/apply',
  authenticate,
  authorize(['STUDENT']),
  applyToScholarshipExamHandler
);

router.patch(
  '/:examId/status',
  authenticate,
  authorize(['INSTITUTE', 'ADMIN']),
  updateExamStatusHandler
);

module.exports = router;