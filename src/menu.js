
import os from 'os';
import path from 'path';
import { app, BrowserWindow, shell, Menu, dialog } from 'electron';

const appName = app.getName();
const Config = require('electron-config');
const config = new Config();


function sendAction(action) {
    const win = BrowserWindow.getAllWindows()[0];

    if (process.platform === 'darwin') {
        win.restore();
    }

    win.webContents.send(action);
}

const viewSubmenu = [{
    label: 'Reset Text Size',
    accelerator: 'CmdOrCtrl+0',
    click() {
        sendAction('zoom-reset');
    }
}, {
    label: 'Increase Text Size',
    accelerator: 'CmdOrCtrl+Plus',
    click() {
        sendAction('zoom-in');
    }
}, {
    label: 'Decrease Text Size',
    accelerator: 'CmdOrCtrl+-',
    click() {
        sendAction('zoom-out');
    }
}];

const helpSubmenu = [{
    label: `${appName} Website`,
    click() {
        shell.openExternal('http://beatplus.github.io/Protonmail/');
    }
}, {
    label: `${appName} Source Code`,
    click() {
        shell.openExternal('https://github.com/BeatPlus/Protonmail')
    }
}, {
    label: 'Report an issue',
    click() {
        const body = `
<!-- Please succinctly describe your issue and steps to reproduce it. -->

-

${app.getName()} ${app.getVersion()}
Electron ${process.versions.electron}
${process.platform} ${process.arch} ${os.release()}`;

        shell.openExternal(`https://github.com/BeatPlus/Protonmail/issues/new?body=${encodeURIComponent(body)}`);
    }
}];

if (process.platform !== 'darwin') {
    helpSubmenu.push({
        type: 'separator'
    }, {
        label: `About ${appName}`,
        click() {
            dialog.showMessageBox({
                title: `About ${appName}`,
                message: `${appName} ${app.getVersion()}`,
                detail: 'Unofficial Protonmail desktop app, created by Matthew Core <BeatPlus> and Hayden Suarez-Davis <HaydenSD>.',
                icon: path.join(__dirname, 'static', process.platform === 'linux' ? 'Icon-linux-about.png' : 'IconTray.png'),
                buttons: ['Close']
            });
        }
    });

	viewSubmenu.push({
		type: 'separator'
	}, {
		type: 'checkbox',
		label: 'Always on Top',
		accelerator: 'Ctrl+Shift+T',
		checked: config.get('alwaysOnTop'),
		click(item, focusedWindow) {
			config.set('alwaysOnTop', item.checked);
			focusedWindow.setAlwaysOnTop(item.checked);
		}
	});    
}

const MenuTpl = [{
    label: 'File',
    submenu: [{
        label: 'Compose new email',
        accelerator: 'CmdOrCtrl+N',
        click() {
            sendAction('new-email');
        }
    }, {
        label: 'Close composer',
        accelerator: 'Esc',
        click() {
            sendAction('close-composer');
        }
    }, {
        label: 'Log Out',
        click() {
            sendAction('log-out');
        }
    }, {
        type: 'separator'
    }, {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click() {
            app.quit();
        }
    }]
}, {
    label: 'Edit',
    submenu: [{
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
    }, {
        type: 'separator'
    }, {
        label: 'Toggle Dark Mode',
        accelerator: 'CmdOrCtrl+D',
        click() {
            sendAction('toggle-dark-mode');
        }
    }, {
        label: 'Preferences',
        accelerator: 'CmdOrCtrl+,',
        click() {
            sendAction('show-preferences');
        }
    }]
}, {
    label: 'View',
    submenu: viewSubmenu
}, {
    label: 'Help',
    role: 'help',
    submenu: helpSubmenu
}];

module.exports = Menu.buildFromTemplate(MenuTpl);