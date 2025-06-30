// src/middleware/rbac.middleware.js

/**
 * authorize(requiredRoles):
 *  - ADMIN bypasses all checks
 *  - Other roles must be in requiredRoles
 */
function authorize(requiredRoles = []) {
  return (req, res, next) => {
    const userRole = req.user && req.user.role;
    if (!userRole) {
      return res.status(401).json({ error: true, message: 'No role found' });
    }

    // ADMIN bypass
    if (userRole === 'ADMIN') {
      return next();
    }

    // enforce other roles
    if (!requiredRoles.includes(userRole)) {
      return res.status(401).json({ error: true, message: 'No role found' });
    }

    next();
  };
}

module.exports = { authorize };
