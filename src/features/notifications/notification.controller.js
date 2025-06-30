const { 
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification
} = require('./notification.service');

async function getNotificationsHandler(req, res, next) {
  try {
    const notifications = await getNotifications();
    res.json({ success: true, data: notifications });
  } catch (err) {
    next(err);
  }
}

async function createNotificationHandler(req, res, next) {
  try {
    const { type, message } = req.body;
    const notification = await createNotification({ type, message });
    res.status(201).json({ success: true, data: notification });
  } catch (err) {
    next(err);
  }
}

async function updateNotificationHandler(req, res, next) {
  try {
    const { id } = req.params;
    const { type, message } = req.body;
    const notification = await updateNotification(id, { type, message });
    res.json({ success: true, data: notification });
  } catch (err) {
    next(err);
  }
}

async function deleteNotificationHandler(req, res, next) {
  try {
    const { id } = req.params;
    await deleteNotification(id);
    res.json({ success: true, message: 'Notification deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { 
  getNotificationsHandler, 
  createNotificationHandler,
  updateNotificationHandler,
  deleteNotificationHandler
};