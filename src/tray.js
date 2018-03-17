// This file manages the tray system
import { app, Menu, Tray, ipcMain } from 'electron';
import { ICONS } from './icons';

let tray = null;

export default {
  create: win => {
    ipcMain.on('set-badge', (event, arg) => setBadge(arg));

    if (process.platform === 'darwin' || tray) {
      return;
    }

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

    tray = new Tray(ICONS.TRAY);
    tray.setToolTip(`${app.getName()}`);
    tray.setContextMenu(contextMenu);
    tray.on('click', toggleWin);
  },
};

const setBadge = unreadCount => {
  if (process.platform === 'darwin') {
    app.dock.setBadge(unreadCount ? unreadCount.toString() : '');
    return;
  }

  if (!tray) {
    return;
  }

  tray.setImage(unreadCount ? ICONS.TRAY_UNREAD : ICONS.TRAY);
};
