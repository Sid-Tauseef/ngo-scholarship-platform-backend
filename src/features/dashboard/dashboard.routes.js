const { Router }        = require('express');
const { authenticate }  = require('../../middleware/auth.middleware');
const { authorize }     = require('../../middleware/rbac.middleware');
const {
  memberStatsHandler,
  adminStatsHandler,
  instituteStatsHandler
} = require('./dashboard.controller');

const router = Router();


// Institute-level stats
router.get(
  '/institute/stats',
  authenticate,
  authorize(['INSTITUTE']),
  instituteStatsHandler
);

// Member-level stats
router.get(
  '/member/stats',
  authenticate,
  authorize(['ADMIN', 'MEMBER']),
  memberStatsHandler
);

// Admin-level stats
router.get(
  '/admin/stats',
  authenticate,
  authorize(['ADMIN']),
  adminStatsHandler
);

module.exports = router;
