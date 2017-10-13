import { ipcRenderer as ipc } from 'electron';
import { Sidebar } from './sidebar';

require('electron-context-menu-handler')();
const settings = require('electron-settings');

function setDarkMode() {
  document.documentElement.classList.toggle('dark-mode', settings.get('darkMode'));
}

ipc.on('toggle-dark-mode', () => {
  settings.set('darkMode', !settings.get('darkMode'));
  setDarkMode();
});

document.addEventListener('DOMContentLoaded', () => {

  // Activate Dark Mode if it was set before quitting
  setDarkMode();

  setTimeout(() => new Sidebar(), 0);
});
