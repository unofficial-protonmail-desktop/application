import path from 'path';
import { app, ipcMain, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';
import electronDebug from 'electron-debug';
import createWindow from './helpers/window';
import tray from './tray';
import getMenu from './get-menu';
import pkgJson from '../../package.json';

const settings = require('electron-settings');
require('electron-dl')({saveAs: true});

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  );
};

if (process.env.NAME === 'development') {
  electronDebug({enabled: true});
}

if (!process.env.NAME) {
  autoUpdater.checkForUpdatesAndNotify();
}

require('electron-context-menu')();

let mainWindow;
let isQuitting = false;

ipcMain.on('notificationClick', () => {
  mainWindow.show();
});

function createMainWindow() {
  if (process.argv.indexOf('test') !== -1) {
    try {
      settings.unset();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  const isDarkMode = settings.getSync('darkMode');

  const win = new createWindow('main', {
    title: app.name,
    show: false,
    width: 1300,
    height: 850,
    icon: process.platform === 'linux' && path.join(__dirname, 'images/Icon.png'),
    minWidth: 500,
    minHeight: 700,
    alwaysOnTop: settings.getSync('alwaysOnTop'),
    titleBarStyle: 'hiddenInset',
    autoHideMenuBar: true,
    darkTheme: isDarkMode, // GTK+3
    //backgroundColor: isDarkMode ? '#192633' : '#fff',
    webPreferences: {
      preload: './renderer.js',
      nodeIntegration: true,
      plugins: true,
      webviewTag: true,
    }
  });

  if (process.platform === 'darwin') {
    win.setSheetOffset(40);
  }

  const url = process.env.NAME === 'development' ? 'http://localhost:8080' : 'file://'.concat(__dirname, '/index.html');
  win.loadURL(url);

  win.on('close', e => {
    if (!isQuitting) {
      e.preventDefault();

      if (process.platform === 'darwin') {
        app.hide();
      } else {
        win.hide();
      }
    }
  });

  return win;
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.exit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      } else if (process.platform === 'win32') {
        mainWindow.show();
      }

      mainWindow.focus();
    }
  });


  app.on('ready', async () => {
    if (process.env.NAME === 'development') {
      await installExtensions();
    }

    if (process.platform === 'win32') {
      app.setAppUserModelId(pkgJson.build.appId);
    }

    Menu.setApplicationMenu(getMenu());
    mainWindow = createMainWindow();
    tray.create(mainWindow);

    const page = mainWindow.webContents;

    const argv = require('minimist')(process.argv.slice(1));

    page.on('dom-ready', () => {
      if (!mainWindow) return;

      if (argv.minimize) {
        mainWindow.minimize();
      } else {
        mainWindow.show();
      }

      if (process.env.NAME === 'development') {
        mainWindow.openDevTools();
      }
    });
  });

  app.on('activate', () => {
    mainWindow.show();
  });

  app.on('before-quit', () => {
    isQuitting = true;
  });
}
