(function () {'use strict';

var electron = require('electron');

const config = require('./config');

electron.ipcRenderer.on('GoInbox', () => {
    // Go to Inbox/inbox
    document.querySelector('a[href=\'/inbox\']').click();
});

electron.ipcRenderer.on('show-preferences', () => {
    // Click preferences button
    document.querySelector('#tour-settings').click();
});

electron.ipcRenderer.on('new-email', () => {
    // Click COMPOSE button
    document.querySelector('.compose.pm_button.primary').click();
});

electron.ipcRenderer.on('log-out', () => {
    // Click hided logout button
    document.querySelector('.pm_button.primary.text-center').click();
});

electron.ipcRenderer.on('close-composer', () => {
    // Click COMPOSE button
    document.querySelector('.pm_button.link.close-button').click();
});

function setDarkMode() {
    document.documentElement.classList.toggle('dark-mode', config.get('darkMode'));
}

electron.ipcRenderer.on('toggle-dark-mode', () => {
    config.set('darkMode', !config.get('darkMode'));
    setDarkMode();
});

electron.ipcRenderer.on('zoom-reset', () => {
    setZoom(1.0);
});

electron.ipcRenderer.on('zoom-in', () => {
    const zoomFactor = config.get('zoomFactor') + 0.1;

    if (zoomFactor < 1.6) {
        setZoom(zoomFactor);
    }
});

electron.ipcRenderer.on('zoom-out', () => {
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

	// Activate Dark Mode if it was set before quitting
	setDarkMode();
   
});

}());
//# sourceMappingURL=browser.js.map