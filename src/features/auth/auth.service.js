const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const User   = require('./auth.model');
const Member = require('../members/member.model');  // <— pull in Member
const Student = require('../students/student.model');
const logger = require('../../utils/logger');

const SALT_ROUNDS = 10;

async function login({ email, password }) {
  logger.info(`Login attempt for ${email}`);

  // 1) Look in users
  let account = await User.findOne({ email });
  
  // 2) Fallback: look in members
  if (!account) {
    logger.info(`Not a User; checking Members for ${email}`);
    account = await Member.findOne({ email });
  }
  // 3) Fallback: look in students
  if (!account) {
    logger.info(`Not a Member; checking Students for ${email}`);
    account = await Student.findOne({ email });
  }

  if (!account) {
    logger.warn(`No account found for ${email}`);
    throw { status: 401, message: 'Invalid credentials' };
  }

  // 4) Verify password
  const match = await bcrypt.compare(password, account.password);
  if (!match) {
    logger.warn(`Password mismatch for ${email}`);
    throw { status: 401, message: 'Invalid credentials' };
  }

  // 5) Issue JWT
  const payload = { id: account._id, role: account.role };
  const token   = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

  // 6) Return a unified response
  return { 
    user: account.toJSON(),   // strips password automatically 
    token 
  };
}

async function register({ name, email, password, role }) {
  // Check if email already exists in User, Member, or Student collections
  const existingUser = await User.findOne({ email });
  const existingMember = await Member.findOne({ email });
  const existingStudent = await Student.findOne({ email });

  if (existingUser || existingMember || existingStudent) {
    throw { status: 400, message: 'Email already in use' };
  }

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);

  if (role === 'STUDENT') {
    const student = new Student({
      name,
      email,
      password: hashed,
      // You might want to include rollNumber or course in frontend too
      course: 'N/A',         // Set a placeholder if not provided
      rollNumber: `TMP${Date.now()}` // Or generate/require this properly
    });
    await student.save();
    return student;
  }

  if (role === 'MEMBER') {
    const member = new Member({ name, email, password: hashed });
    await member.save();
    return member;
  }

  // Default fallback: create in User collection
  const user = new User({ name, email, password: hashed, role });
  await user.save();
  return user;
}


module.exports = { register, login };
