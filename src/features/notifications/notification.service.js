const Notification = require('./notification.model');

async function createNotification({ type, message }) {
  const notification = new Notification({ type, message });
  await notification.save();
  return notification;
}

async function getNotifications() {
  return await Notification.find().sort({ createdAt: -1 });
}

async function updateNotification(id, { type, message }) {
  return await Notification.findByIdAndUpdate(
    id, 
    { type, message },
    { new: true, runValidators: true }
  );
}

async function deleteNotification(id) {
  return await Notification.findByIdAndDelete(id);
}

module.exports = { 
  createNotification, 
  getNotifications,
  updateNotification,
  deleteNotification
};