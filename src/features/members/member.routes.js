// src/features/members/member.routes.js
const { Router } = require('express');
const {
  getMembersHandler,
  createMemberHandler,
  updateMemberHandler,
  deleteMemberHandler,
} = require('./member.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { authorize } = require('../../middleware/rbac.middleware');

const router = Router();

// Only ADMIN can manage members
router.get('/', authenticate, authorize(['ADMIN']), getMembersHandler);
router.post('/', authenticate, authorize(['ADMIN']), createMemberHandler);
router.put('/:id', authenticate, authorize(['ADMIN']), updateMemberHandler);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteMemberHandler);

module.exports = router;
