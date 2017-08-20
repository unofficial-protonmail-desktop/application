import { Application } from 'spectron';

const path = require('path');

const beforeEach = function (env = {}) {
  this.timeout(50000);
  this.app = new Application({
    path: path.resolve('dist/linux-unpacked/protonmail-desktop'),
    args: ['.'],
    startTimeout: 50000,
    waitTimeout: 50000,
    env: Object.assign(env, {
      DEBUG: 'false',
      NAME: 'test',
    }),
  });

  return this.app.start();
};

const afterEach = function () {
  this.timeout(50000);
  if (this.app && this.app.isRunning()) {
    return this.app.stop();
  }
  return undefined;
};

export default {
  beforeEach,
  afterEach,
};
