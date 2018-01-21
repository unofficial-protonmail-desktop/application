import { expect } from 'chai';
import testUtils from './utils';



describe('auto updater', function () {
  this.timeout(20000);
  console.log('mocka');

  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);

  it('should display a dialog when an update has been downloaded', function () {
    this.app.client.waitUntilWindowLoaded()
      .pause(1000);

    this.app.client.getMainProcessLogs().then(function (logs) {
      logs.forEach(function (log) {
        console.log(log)
      })
    });
  });
});
