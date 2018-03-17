const { app, dialog, nativeImage }  = require('electron');
const { autoUpdater } = require('electron-updater');

const { ICONS } = require('./icons');

export const initiateAutoUpdater = () => {
  autoUpdater.autoDownload = true;

  app.on('ready', () => {
    autoUpdater.checkForUpdates();
  });

  autoUpdater.on('error', error => {
    dialog.showMessageBox(null, {
      type: 'error',
      title: 'Something went wrong',
      message: 'Ops! ProtonMail Desktops auto updater failed. Check ' +
      'https://github.com/protonmail-desktop/application for the latest updates and ' +
      'please create an issue.',
      details: JSON.stringify(error),
      buttons: [
        'Okey'
      ]
    }, () => true);
  });

  autoUpdater.on('update-downloaded', updateInfo => {
    dialog.showMessageBox(null, {
      type: 'info',
      title: 'Update of Protonmail Desktop available!',
      message: `Protonmail Desktop ${updateInfo.version} is ready to be installed!`,
      detail: updateInfo.releaseNotes.replace(/<[^>]+>/g, ''),
      buttons: [
        'Install update and restart app',
        'Postpone this update',
      ],
      defaultId: 0,
      cancelId: 1,
      icon: nativeImage.createFromPath(ICONS.TRAY),
    }, response => {
      if (response === 1) return;

      autoUpdater.quitAndInstall();
    });
  });
};
