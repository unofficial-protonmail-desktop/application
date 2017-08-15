import electron from 'electron';
import { Application } from 'spectron';

const beforeEach = async function (env = {}) {
  this.timeout(10000);
  this.app = new Application({
    path: electron,
    args: ['.'],
    startTimeout: 10000,
    waitTimeout: 10000,
    env: Object.assign(env, {
      DEBUG: 'false',
      NAME: 'TEST',
    }),
  });
  
  await this.app.start();
  
  return this.app;
};

const afterEach = function () {
  this.timeout(10000);
  if (this.app && this.app.isRunning()) {
    return this.app.stop();
  }
  return undefined;
};

export default {
  beforeEach,
  afterEach,
};
