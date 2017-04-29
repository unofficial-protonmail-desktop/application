import path from 'path';
import jetpack from 'fs-jetpack';
import { app, BrowserWindow, Menu, shell } from 'electron';
import createWindow from './helpers/window';

const config = require('./config');
//import env from './env';

const appMenu = require('./menu');
const tray = require('./tray');


require('electron-debug')({enabled: true});
require('electron-dl')({saveAs: true});
require('electron-context-menu')();

let mainWindow;
let isQuitting = false;
let oldtitle;

/*if (env.name !== 'production') {
    var userDataPath = app.getPath('userData');
    app.setPath('userData', userDataPath + ' (' + env.name + ')');
}
*/
const isAlreadyRunning = app.makeSingleInstance(() => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}

		mainWindow.show();
	}
});

if (isAlreadyRunning) {
	app.quit();
}

function updateBadge(messageCount) {
    // Set badge
    if (process.platform === 'darwin') {
        app.dock.setBadge(messageCount ? messageCount[1] : '');
    } else {
        tray.setBadge(messageCount);
    }
}

function checkMessages(title) {
    // Update badge
    // How many new messages on new title?
    const messageCount = (/\(([0-9]+)\)/).exec(title);
    // How many messages I had?
    const messageCountOld = (/\(([0-9]+)\)/).exec(oldtitle);

    // No unread messages, do nothing than setting badge to 0
    if (!messageCount) {
        const indexCount = (/inbox/i).exec(title);
        if (indexCount) {
            oldtitle = 0;
            updateBadge(0);
        }
        return;
    }

    // No new messages, do nothing.
    if (messageCountOld && messageCount[1] <= messageCountOld[1]) {
        updateBadge(0);
        return;
    }

    oldtitle = title;
}



function createMainWindow() {
	const isDarkMode = config.get('darkMode');

	const win = new createWindow('main', {
		title: app.getName(),
		show: false,
		width: 1300,
		height: 850,
		icon: process.platform === 'linux' && path.join(__dirname, 'static/Icon.png'),
		minWidth: 1000,
		minHeight: 700,
		alwaysOnTop: config.get('alwaysOnTop'),
    titleBarStyle: 'hidden-inset',
		autoHideMenuBar: true,
		darkTheme: isDarkMode, // GTK+3
		//backgroundColor: isDarkMode ? '#192633' : '#fff',
		webPreferences: {
			preload: path.join(__dirname, 'browser.js'),
			nodeIntegration: true,
			plugins: true
		}
	});

	if (process.platform === 'darwin') {
		win.setSheetOffset(40);
	}

    win.loadURL('file://' + __dirname + '/index.html');

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

    win.on('page-title-updated', (e, title) => {
        e.preventDefault();
        checkMessages(title);
    });

	return win;
}

app.on('ready', () => {
	Menu.setApplicationMenu(appMenu);
	mainWindow = createMainWindow();
	tray.create(mainWindow);

	const page = mainWindow.webContents;

	const argv = require('minimist')(process.argv.slice(1));

	page.on('dom-ready', () => {
		page.insertCSS(jetpack.read(path.join(__dirname, 'browser.css'), 'utf8'));
		page.insertCSS(jetpack.read(path.join(__dirname, 'themes/dark-mode.css'), 'utf8'));

        if (process.platform === 'darwin') {
            page.insertCSS(jetpack.read(path.join(__dirname, 'themes/osx-fix.css'), 'utf8'));
        }
        
		if (argv.minimize) {
			mainWindow.minimize();
		} else {
			mainWindow.show();
		}
	});

	page.on('new-window', (e, url) => {
		e.preventDefault();
		shell.openExternal(url);
	});
});

app.on('activate', () => {
	mainWindow.show();
});

app.on('before-quit', () => {
    isQuitting = true;
});


