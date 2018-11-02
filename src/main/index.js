import path from 'path';
import { app, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';
import electronDebug from 'electron-debug';
import createWindow from './helpers/window';
import { migrateSettings } from './migrate-settings';
import tray from './tray';
import getMenu from './get-menu';

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

migrateSettings();

if (process.env.NAME === 'development') {
  electronDebug({enabled: true});
}

if (!process.env.NAME) {
  autoUpdater.checkForUpdatesAndNotify();
}

require('electron-context-menu')();

let mainWindow;
let isQuitting = false;

const isAlreadyRunning = app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

if (isAlreadyRunning) {
  app.exit();
}

function createMainWindow() {
  if (process.argv.indexOf('test') !== -1) {
    try {
      settings.deleteAll();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  const isDarkMode = settings.get('darkMode');

  const win = new createWindow('main', {
    title: app.getName(),
    show: false,
    width: 1300,
    height: 850,
    icon: process.platform === 'linux' && path.join(__dirname, 'images/Icon.png'),
    minWidth: 1000,
    minHeight: 700,
    alwaysOnTop: settings.get('alwaysOnTop'),
    titleBarStyle: 'hiddenInset',
    autoHideMenuBar: true,
    darkTheme: isDarkMode, // GTK+3
    //backgroundColor: isDarkMode ? '#192633' : '#fff',
    webPreferences: {
      preload: './renderer.js',
      nodeIntegration: true,
      plugins: true
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

app.on('ready', async () => {
  if (process.env.NAME === 'development') {
    await installExtensions();
    /* eslint-enable no-console */
  }

  Menu.setApplicationMenu(getMenu());
  mainWindow = createMainWindow();
  tray.create(mainWindow);

  const page = mainWindow.webContents;

  const argv = require('minimist')(process.argv.slice(1));

  page.on('dom-ready', () => {
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
