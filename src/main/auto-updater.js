const { app, dialog }  = require('electron');
const { autoUpdater } = require('electron-updater');

export const initiateAutoUpdater = () => {
  app.on('ready', async () => {
    autoUpdater.checkForUpdatesAndNotify();
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
