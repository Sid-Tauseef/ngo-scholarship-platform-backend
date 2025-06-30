const { Router }     = require('express');
const { body, validationResult } = require('express-validator');
const { registerHandler, loginHandler } = require('./auth.controller');

const router = Router();

// Helper middleware for validation
function validate(rules) {
  return async (req, res, next) => {
    await Promise.all(rules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array().map(e => e.msg) 
      });
    }
    next();
  };
}

// POST /api/auth/register
router.post(
  '/register',
  validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be ≥6 chars'),
    body('role').isIn(['ADMIN','INSTITUTE','MEMBER','STUDENT']).withMessage('Invalid role')
  ]),
  registerHandler
);

// POST /api/auth/login
router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ]),
  loginHandler
);

module.exports = router;
