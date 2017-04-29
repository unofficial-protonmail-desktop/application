import { ipcRenderer as ipc } from 'electron';

// To substitute with env
const config = require('./config');

ipc.on('GoInbox', () => {
    // Go to Inbox/inbox
    document.querySelector('a[href=\'/inbox\']').click();
});

ipc.on('show-preferences', () => {
    // Click preferences button
    document.querySelector('#tour-settings').click();
});

ipc.on('new-email', () => {
    // Click COMPOSE button
    document.querySelector('.compose.pm_button.primary').click();
});

ipc.on('log-out', () => {
    // Click hided logout button
    document.querySelector('.pm_button.primary.text-center').click();
});

ipc.on('close-composer', () => {
    // Click COMPOSE button
    document.querySelector('.pm_button.link.close-button').click();
});

function setDarkMode() {
    document.documentElement.classList.toggle('dark-mode', config.get('darkMode'));
}

ipc.on('toggle-dark-mode', () => {
    config.set('darkMode', !config.get('darkMode'));
    setDarkMode();
});

ipc.on('zoom-reset', () => {
    setZoom(1.0);
});

ipc.on('zoom-in', () => {
    const zoomFactor = config.get('zoomFactor') + 0.1;

    if (zoomFactor < 1.6) {
        setZoom(zoomFactor);
    }
});

ipc.on('zoom-out', () => {
    const zoomFactor = config.get('zoomFactor') - 0.1;

    if (zoomFactor >= 0.8) {
        setZoom(zoomFactor);
    }
});

function setZoom(zoomFactor) {
    const node = document.getElementById('zoomFactor');
    node.textContent = `#wrapper {zoom: ${zoomFactor} !important}`;
    config.set('zoomFactor', zoomFactor);
}

// Inject a global style node to maintain zoom factor after conversation change.
// Also set the zoom factor if it was set before quitting.
document.addEventListener('DOMContentLoaded', () => {
    const zoomFactor = config.get('zoomFactor') || 1.0;
    const style = document.createElement('style');
    style.id = 'zoomFactor';

    document.body.appendChild(style);
    setZoom(zoomFactor);
    const TabGroup = require('electron-tabs');
    
    let tabGroup = new TabGroup();
    let tab = tabGroup.addTab({
      title: "my@email.com",
      src: "https://mail.protonmail.com/login",
      visible: true
    });
    tab.activate();
    let tab2 = tabGroup.addTab({
      title: "my.second@email.com",
      src: "https://mail.protonmail.com/login",
      visible: true
    });
  
  // Activate Dark Mode if it was set before quitting
	setDarkMode();
   
});