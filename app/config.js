'use strict';
const Config = require('electron-config');

module.exports = new Config({
    defaults: {
        darkMode: true,
        zoomFactor: 1,
        lastWindowState: {
            width: 1300,
            height: 850
        }
    }
});
