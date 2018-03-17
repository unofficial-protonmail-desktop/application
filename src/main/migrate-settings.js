const fs = require('fs-jetpack');
const electron = require('electron');
const settings = require('electron-settings');

const oldConfigPath = electron.app.getPath('userData').concat('/config.json');

export const migrateSettings = () => {
  if (fs.exists(oldConfigPath)) {
    const oldConfig = JSON.parse(fs.read(oldConfigPath));
    
    Object.keys(oldConfig)
      .forEach(key => {
        settings.set(key, oldConfig[key]);
      });
    
    fs.remove(oldConfigPath);
  }
};
