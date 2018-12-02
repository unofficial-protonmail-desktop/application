import { Application } from 'spectron';

const path = require('path');
const fs = require('fs');
const electron = require('electron');

const beforeEach = function (env = {}) {
  this.timeout(50000);
  this.app = new Application({
    path: electron,
    args: ['.', 'test'],
    startTimeout: 50000,
    waitTimeout: 50000,
    chromeDriverLogPath: process.cwd().concat('/chrome-driver.log'),
    webdriverLogPath: process.cwd(),
    env: Object.assign(env, {
      DEBUG: 'false',
      NAME: 'test',
    }),
  });

  return this.app.start();
};

const afterEach = async function () {
  await this.app.client.localStorage('DELETE');

  this.timeout(50000);
  if (this.app && this.app.isRunning()) {
    return this.app.stop();
  }
  return undefined;
};

const saveErrorShot = async function (e) {
  if (this.app.browserWindow) {
    const filename = `errorShot-${this.test.parent.title}-${this.test.title}-${new Date().toISOString()}.png`
      .replace(/\s/g, '_')
      .replace(/:/g, '');

    await this.app.browserWindow.capturePage().then(imageBuffer => {
      return new Promise(resolve => {
        fs.writeFile(filename, imageBuffer, error => {
          if (error) throw error;

          console.info(`Screenshot saved: ${process.cwd()}/${filename}`);
          resolve();
        });
      });
    });
  }

  throw e;
};

const printElectronLogs = function (e) {
    this.app.client.getMainProcessLogs()
      .then(logs => logs.forEach(log => console.log(log)));

    this.app.client.getRenderProcessLogs()
      .then(logs => logs.forEach(function (log) {
        console.log(log.message)
        console.log(log.source)
        console.log(log.level)
      }));
};

export default {
  beforeEach,
  afterEach,
  saveErrorShot,
  printElectronLogs,
};
