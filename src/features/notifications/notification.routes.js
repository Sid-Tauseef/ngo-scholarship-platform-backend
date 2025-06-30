const { Router } = require('express');
const { 
  getNotificationsHandler,
  createNotificationHandler,
  updateNotificationHandler,
  deleteNotificationHandler
} = require('./notification.controller');

const router = Router();

router.get('/', getNotificationsHandler);
router.post('/', createNotificationHandler);
router.put('/:id', updateNotificationHandler);
router.delete('/:id', deleteNotificationHandler);

module.exports = router;