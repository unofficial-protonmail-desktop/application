import path from 'path';
import { app, Menu, ipcMain } from 'electron';
import electronDebug from 'electron-debug';
import createWindow from './helpers/window';
import { migrateSettings } from './migrate-settings';
import { initiateAutoUpdater } from './auto-updater';
import tray from './tray';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

const settings = require('electron-settings');

require('electron-dl')({saveAs: true});

migrateSettings();

if (process.env.NAME === 'development') {
  electronDebug({enabled: true});
}

if (!process.env.NAME) {
  initiateAutoUpdater();
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
    settings.deleteAll();
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
    titleBarStyle: 'hidden-inset',
    autoHideMenuBar: true,
    darkTheme: isDarkMode, // GTK+3
    //backgroundColor: isDarkMode ? '#192633' : '#fff',
    webPreferences: {
      preload:  './renderer.js',
      nodeIntegration: true,
      plugins: true
    }
  });

    /**
   * Trick to make the window draggable
   * https://github.com/electron/electron/pull/5557
   */
  const titleBarHack =
          'var div = document.createElement("div");' +
          'div.style.position = "absolute";' +
          'div.style.top = 0;' +
          'div.style.height = "23px";' +
          'div.style.width = "100%";' +
          'div.style["-webkit-app-region"] = "drag";' +
          'document.body.appendChild(div);';

  win.webContents.on('did-finish-load', function () {
    if (process.platform === 'darwin') {
      win.webContents.executeJavaScript(titleBarHack);
    }
  });

  if (process.platform === 'darwin') {
    win.setSheetOffset(40);
  }

  win.loadURL('http://localhost:8080');

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

app.on('ready', () => {
  if (process.env.NAME === 'development') {
    /* eslint-disable no-console */
    [REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS]
      .forEach(extension =>
        installExtension(extension)
          .then((name) => console.log(`Added Extension:  ${name}`))
          .catch((err) => console.log('An error occurred: ', err))
      );
    /* eslint-enable no-console */
  }

  Menu.setApplicationMenu(require('./menu'));
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

ipcMain.once('listen-for-browser-window-focus', event => {
  app.on('browser-window-focus', () => {
    event.sender.send('browser-window-focus');
  });

});

app.on('activate', () => {
  mainWindow.show();
});

app.on('before-quit', () => {
  isQuitting = true;
});
