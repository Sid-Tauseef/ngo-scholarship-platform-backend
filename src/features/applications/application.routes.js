const { Router } = require('express');
const { authenticate } = require('../../middleware/auth.middleware');
const { authorize } = require('../../middleware/rbac.middleware');
const { 
  getMyApplicationsHandler, 
  getMyAdmitCardHandler,
  getAllApplicationsHandler,
  getApplicationByIdHandler,
  updateApplicationStatusHandler
} = require('./application.controller');

const router = Router();

// STUDENT ROUTES
router.get('/me/applications', 
  authenticate, 
  authorize(['STUDENT']), 
  getMyApplicationsHandler
);

router.get('/me/admit-card', 
  authenticate, 
  authorize(['STUDENT']), 
  getMyAdmitCardHandler
);

// ADMIN ROUTES
router.get('/admin/applications', 
  authenticate, 
  authorize(['ADMIN']), 
  getAllApplicationsHandler
);

router.get('/admin/applications/:id', 
  authenticate, 
  authorize(['ADMIN']), 
  getApplicationByIdHandler
);

router.put('/admin/applications/:id/status', 
  authenticate, 
  authorize(['ADMIN']), 
  updateApplicationStatusHandler
);

module.exports = router;