// src/utils/notificationService.js

const MAX_NOTIFICATIONS = 10;

let notifications = [];

export function pushNotification(notifObj) {
  const id = Date.now();
  const entry = {
    id,
    message: notifObj.message,
    tanggal: notifObj.tanggal instanceof Date ? notifObj.tanggal : new Date(),
    type: notifObj.type,
  };
  notifications.unshift(entry);
  if (notifications.length > MAX_NOTIFICATIONS) {
    notifications.pop();
  }
}

export function getNotifications() {
  return notifications;
}
