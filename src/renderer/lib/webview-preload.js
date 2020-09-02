import { ipcRenderer } from 'electron';

const originalNotification = window.Notification;

window.Notification = function(title, opts) {
  const _notice = new originalNotification(title, opts);

  _notice.addEventListener('click', () => {
    ipcRenderer.sendToHost('notificationClick', opts);
  });

  return _notice;
};
