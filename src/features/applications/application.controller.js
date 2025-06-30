const { 
  getApplicationsByStudent, 
  getAdmitCardForStudent,
  getAllApplications,        // new
  getApplicationById,       // new
  updateApplicationStatus   // new
} = require('./application.service');




// ... existing handlers ...
async function getMyApplicationsHandler(req, res, next) {
  try {
    const studentId = req.user.id;
    const applications = await getApplicationsByStudent(studentId);
    res.json({ success: true, data: applications });
  } catch (err) {
    next(err);
  }
}

async function getMyAdmitCardHandler(req, res, next) {
  try {
    const studentId = req.user.id;
    const application = await getAdmitCardForStudent(studentId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'No approved application found'
      });
    }

    res.json({
      success: true,
      data: { url: application.scheme.admitCardUrl }
    });
  } catch (err) {
    next(err);
  }
}


// NEW: Get all applications (admin)
async function getAllApplicationsHandler(req, res, next) {
  try {
    const applications = await getAllApplications();
    res.json({ 
      success: true,
      data: applications,
      count: applications.length
    });
  } catch (err) {
    next(err);
  }
}

// NEW: Get single application by ID (admin)
async function getApplicationByIdHandler(req, res, next) {
  try {
    const application = await getApplicationById(req.params.id);
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }
    res.json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
}

// NEW: Update application status (admin)
async function updateApplicationStatusHandler(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await updateApplicationStatus(id, status);
    
    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Application status updated',
      data: updated
    });
  } catch (err) {
    next(err);
  }
}



module.exports = { 
  getMyApplicationsHandler, 
  getMyAdmitCardHandler,
  getAllApplicationsHandler,       
  getApplicationByIdHandler,      
  updateApplicationStatusHandler  
};