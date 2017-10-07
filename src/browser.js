import { ipcRenderer as ipc } from 'electron';
import { Sidebar } from './sidebar';

require('electron-context-menu-handler')();
const settings = require('electron-settings');

const clickElement = (selector) => {
  const el = document.querySelector(selector);
  
  if (el) {
    el.click();
  }
};

ipc.on('GoInbox', () => {
    // Go to Inbox/inbox
    clickElement('a[href=\'/inbox\']');
});

ipc.on('show-preferences', () => {
    // Click preferences button
    clickElement('#tour-settings');
});

ipc.on('new-email', () => {
    // Click COMPOSE button
    clickElement('.sidebar-btn-compose');
});

ipc.on('log-out', () => {
    // Click hided logout button
    clickElement('.navigationUser-logout');
});

ipc.on('close-composer', () => {
    // Click COMPOSE button
    clickElement('.pm_button.link.close-button');
});

function setDarkMode() {
    document.documentElement.classList.toggle('dark-mode', settings.get('darkMode'));
}

ipc.on('toggle-dark-mode', () => {
    settings.set('darkMode', !settings.get('darkMode'));
    setDarkMode();
});

ipc.on('zoom-reset', () => {
    setZoom(1.0);
});

ipc.on('zoom-in', () => {
    const zoomFactor = settings.get('zoomFactor') + 0.1;

    if (zoomFactor < 1.6) {
        setZoom(zoomFactor);
    }
});

ipc.on('zoom-out', () => {
    const zoomFactor = settings.get('zoomFactor') - 0.1;

    if (zoomFactor >= 0.8) {
        setZoom(zoomFactor);
    }
});

function setZoom(zoomFactor) {
    const node = document.getElementById('zoomFactor');
    node.textContent = `#wrapper {zoom: ${zoomFactor} !important}`;
    settings.set('zoomFactor', zoomFactor);
}

// Inject a global style node to maintain zoom factor after conversation change.
// Also set the zoom factor if it was set before quitting.
document.addEventListener('DOMContentLoaded', () => {
    const zoomFactor = settings.get('zoomFactor') || 1.0;
    const style = document.createElement('style');
    style.id = 'zoomFactor';

    /*const webview = document.createElement("webview");
    webview.src = 'file://' + __dirname + '/settings.html';
    webview.className = 'visible';
    document.querySelector(".etabs-views").appendChild(webview);
    */

    document.body.appendChild(style);
    setZoom(zoomFactor);

    // Activate Dark Mode if it was set before quitting
    setDarkMode();
  
    setTimeout(() => new Sidebar(), 0);
});
