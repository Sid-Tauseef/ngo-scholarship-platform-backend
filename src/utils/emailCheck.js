const User = require('../features/users/users.model');
const Member = require('../features/members/member.model');
const Institute = require('../features/institutes/institute.model');
const Student = require('../features/students/student.model');

async function isEmailUnique(email) {
  const checks = [
    User.findOne({ email }).lean(),
    Member.findOne({ email }).lean(),
    Institute.findOne({ email }).lean(),
    Student.findOne({ email }).lean()
  ];

  const results = await Promise.all(checks);
  return !results.some(result => result !== null);
}

module.exports = isEmailUnique;