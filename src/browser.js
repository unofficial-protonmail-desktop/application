import { ipcRenderer as ipc } from 'electron';
import { Sidebar } from './sidebar';
import './stylesheets/main.scss';

require('electron-context-menu-handler')();
const settings = require('electron-settings');

function setDarkMode() {
  document.documentElement.classList.toggle('dark-mode', settings.get('darkMode'));
}

function setSidebar() {
  document.querySelector('.sidenav').classList.toggle('hidden', settings.get('isSidebarHidden'));  
}

ipc.on('toggle-dark-mode', () => {
  settings.set('darkMode', !settings.get('darkMode'));
  setDarkMode();
});

ipc.on('toggleSidebar', () => {
  settings.set('isSidebarHidden', !settings.get('isSidebarHidden'));
  setSidebar();
});

document.addEventListener('DOMContentLoaded', () => {
  // Activate Dark Mode if it was set before quitting
  setDarkMode();

  setTimeout(() => new Sidebar(), 0);
  if(settings.get('isSidebarHidden')) setSidebar();
});
