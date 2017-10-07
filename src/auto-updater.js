import { ICONS } from "./icons";

const { app, dialog, nativeImage }  = require('electron');
const { autoUpdater } = require('electron-updater');

export const initiateAutoUpdater = () => {
  autoUpdater.autoDownload = true;
  app.on('ready', () => {
    autoUpdater.checkForUpdates();
  });

  autoUpdater.on('update-downloaded', updateInfo => {
    dialog.showMessageBox(null, {
      type: 'info',
      title: 'Update of Protonmail Desktop available!',
      message: `Protonmail Desktop ${updateInfo.version} is ready to be installed!`,
      detail: updateInfo.releaseNotes,
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
