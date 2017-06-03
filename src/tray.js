// This file manages the tray system
import path from 'path';
import { app, Menu, Tray, ipcMain } from 'electron';

let tray = null;

exports.create = win => {
  ipcMain.on('set-badge', (event, arg) => setBadge(arg));

	if (process.platform === 'darwin' || tray) {
		return;
	}

	const iconPath = path.join(__dirname, 'static/IconTray.png');

	const toggleWin = () => {
		if (win.isVisible()) {
			win.hide();
		} else {
			win.show();
		}
	};

	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Toggle',
			click() {
				toggleWin();
			}
		},
		{
			type: 'separator'
		},
		{
			role: 'quit'
		}
	]);

	tray = new Tray(iconPath);
	tray.setToolTip(`${app.getName()}`);
	tray.setContextMenu(contextMenu);
	tray.on('click', toggleWin);
};

const setBadge = unreadCount => {
  if (process.platform === 'darwin') {
    app.dock.setBadge(unreadCount ? unreadCount.toString() : '');
    return;
  }
  
  if (!tray) {
    console.warn('Couldnt find tray when setting badge');
    return;
  }
  
  const icon = unreadCount ? 'IconTrayUnread.png' : 'IconTray.png';
  const iconPath = path.join(__dirname, `static/${icon}`);
  tray.setImage(iconPath);
};
