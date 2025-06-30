const { register, login } = require('./auth.service');

async function registerHandler(req, res, next) {
  try {
    const user = await register(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function loginHandler(req, res, next) {
  try {
    const result = await login(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

module.exports = { registerHandler, loginHandler };
