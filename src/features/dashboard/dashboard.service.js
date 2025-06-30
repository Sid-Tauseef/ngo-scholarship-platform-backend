const User     = require('../users/users.model');
const Exam     = require('../exams/exam.model');
const Donation = require('../donations/donation.model');
const Project  = require('../projects/project.model');




async function getInstituteStats() {
    // INSTITUTE sees only student data
    const totalStudents = await User.countDocuments({ role: 'STUDENT' });
    return { totalStudents };
  }

  
async function getMemberStats() {
  // Example: MEMBERS see total students & projects
  const totalStudents = await User.countDocuments({ role: 'STUDENT' });
  const totalProjects = await Project.countDocuments();
  return { totalStudents, totalProjects };
}

async function getAdminStats() {
  // ADMIN sees everything: users by role, exam regs, donations, projects
  const usersByRole = await User.aggregate([
    { $group: { _id: '$role', count: { $sum: 1 } } }
  ]);
  const examRegistrations = await Exam.countDocuments();
  const donationsTotal = await Donation.aggregate([
    { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
  ]);
  const projectCount = await Project.countDocuments();

  return {
    usersByRole: usersByRole.reduce(
      (acc, { _id, count }) => ({ ...acc, [ _id ]: count }),
      {}
    ),
    examRegistrations,
    donationsTotal: donationsTotal[0]?.totalAmount || 0,
    projectCount
  };
}

module.exports = { getMemberStats, getAdminStats , getInstituteStats };
