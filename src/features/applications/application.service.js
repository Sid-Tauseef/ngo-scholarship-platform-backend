const Application = require('./application.model');


async function createApplication(data) {
  // Check if student has already applied for this scheme
  const existing = await Application.findOne({
    student: data.student,
    scheme: data.scheme
  });

  if (existing) {
    const error = new Error('Student has already applied for this scheme');
    error.status = 400;
    throw error;
  }

  const application = new Application(data);
  return await application.save();
}

async function getApplicationsByStudent(studentId) {
  return await Application.find({ student: studentId })
    .populate('scheme', 'title amount application_deadline');
}

async function getAdmitCardForStudent(studentId) {
  return await Application.findOne({ 
    student: studentId, 
    status: 'APPROVED' 
  }).populate('scheme', 'admitCardUrl');
}

// NEW: Get all applications (admin)
async function getAllApplications() {
  return await Application.find()
    .populate('student', 'name email')
    .populate('scheme', 'title amount');
}

// NEW: Get application by ID (admin)
async function getApplicationById(id) {
  return await Application.findById(id)
    .populate('student', 'name email')
    .populate('scheme', 'title amount');
}

// NEW: Update application status (admin)
async function updateApplicationStatus(id, status) {
  return await Application.findByIdAndUpdate(
    id, 
    { status }, 
    { new: true }
  )
  .populate('student', 'name email')
  .populate('scheme', 'title amount');
}

module.exports = { 
  createApplication, 
  getApplicationsByStudent,
  getAdmitCardForStudent,
  getAllApplications,        // added
  getApplicationById,       // added
  updateApplicationStatus   // added
};
