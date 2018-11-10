const { app, dialog, nativeImage, shell }  = require('electron');
const { autoUpdater } = require('electron-updater');
const packageJson = require('../../package.json');
const { ICONS } = require('./icons');

export const initiateAutoUpdater = () => {
  app.on('ready', async () => {
    const response = await autoUpdater.checkForUpdatesAndNotify();

    if (response === null) {
      autoUpdater.on('update-available', updateInfo => {
        dialog.showMessageBox(null, {
          type: 'info',
          title: 'Update of Protonmail Desktop available!',
          message: `Protonmail Desktop ${updateInfo.version} is ready to be installed!`,
          detail: updateInfo.releaseNotes.replace(/<[^>]+>/g, ''),
          defaultId: 0,
          cancelId: 1,
          icon: nativeImage.createFromPath(ICONS.TRAY),
          buttons: [
            'Download update',
            'Postpone this update',
          ],
        }, r => {
          if (r === 1) return;

          shell.openExternal(packageJson.homepage.concat('/releases'));
        });
      });

      autoUpdater.checkForUpdates();
    }
  });

  autoUpdater.on('error', error => {
    dialog.showMessageBox(null, {
      type: 'error',
      title: 'Something went wrong',
      message: 'ProtonMail Desktops auto updater failed. Check ' +
      'https://github.com/protonmail-desktop/application for the latest updates and ' +
      'please create an issue.',
      details: JSON.stringify(error),
      buttons: [
        'Okey'
      ]
    }, () => true);
  });
};
