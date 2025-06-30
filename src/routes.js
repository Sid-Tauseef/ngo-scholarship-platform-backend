const { Router } = require('express');
const router = Router();

const authRoutes = require('./features/auth/auth.routes');
const dashboardRoutes = require('./features/dashboard/dashboard.routes');
const examRoutes = require('./features/exams/exam.routes');
const notificationRoutes = require('./features/notifications/notification.routes');
const scholarshipExamRoutes = require('./features/scholarship-exams/scholarship-exam.routes');
const schemeRoutes = require('./features/schemes/scheme.routes');
const memberRoutes = require('./features/members/member.routes');
const studentRoutes = require('./features/students/student.routes');
const instituteRoutes = require('./features/institutes/institute.routes');
const applicationRoutes = require('./features/applications/application.routes');




router.get('/health', (req, res) => 
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
);

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/exams', examRoutes);
router.use('/notifications', notificationRoutes);
router.use('/scholarship-exams', scholarshipExamRoutes);
router.use('/schemes', schemeRoutes);
router.use('/members', memberRoutes);
router.use('/students', studentRoutes);
router.use('/institutes', instituteRoutes)
router.use('/', applicationRoutes);

module.exports = router;