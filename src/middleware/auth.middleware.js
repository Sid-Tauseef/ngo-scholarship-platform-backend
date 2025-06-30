const jwt = require('jsonwebtoken');
require('dotenv').config(); 

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s/, '');
  if (!token) return res.status(401).json({ error: true, message: 'No token provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, role, ... }
    next();
  } catch (err) {
    res.status(401).json({ error: true, message: 'Invalid or expired token' });
  }
}

module.exports = { authenticate };
