const { Router } = require('express');
const { authenticate } = require('../../middleware/auth.middleware');
const { authorize } = require('../../middleware/rbac.middleware');
const {
  applyForExamHandler,
  getStudentExamsHandler,
  getInstituteExamsHandler,
  getAllExamsHandler,
  updateExamStatusHandler
} = require('./exam.controller');

const router = Router();

// STUDENT - Apply for an exam
router.post(
  '/apply',
  authenticate,
  authorize(['STUDENT']),
  applyForExamHandler
);

// STUDENT - Get their own exams
router.get(
  '/my-exams',
  authenticate,
  authorize(['STUDENT']),
  getStudentExamsHandler
);

// INSTITUTE - Get exams applied to their institute
router.get(
  '/institute-exams',
  authenticate,
  authorize(['INSTITUTE']),
  getInstituteExamsHandler
);

// ADMIN - View all exam applications (optional)
router.get(
  '/all',
  authenticate,
  authorize(['ADMIN']),
  getAllExamsHandler
);

// INSTITUTE or ADMIN - Update exam status
router.patch(
    '/:examId/status',
    authenticate,
    authorize(['INSTITUTE', 'ADMIN']),
    updateExamStatusHandler
  );
  

module.exports = router;
