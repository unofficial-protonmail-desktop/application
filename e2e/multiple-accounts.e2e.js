import { expect } from 'chai';
import testUtils from './utils';
import { AddCommands } from './commands';

describe('multiple accounts', function () {
  this.timeout(20000);

  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);

  it('creates a new tab when account is added', function () {
    const accountName = 'awesomeMail';

    return this.app.client.waitUntilWindowLoaded()
      .then(() => this.app.client.waitForVisible('button.add-account', 10000))
      .click('button.add-account')
      .then(() => this.app.client.waitForVisible('.sweet-alert input[type=text]'))
      .setValue('.sweet-alert input[type=text]', accountName)
      .pause(500)
      .click('button.confirm')
      .pause(500)
      .getText('.etabs-tabs .etabs-tab-title')
      .then(text => {
        expect(typeof text).equal('string');
        expect(text.toLowerCase()).equal(accountName.slice(0, 1).toLowerCase());
      })
      .windowByIndex(1)
      .then(() => this.app.client.waitForVisible('#pm_login #username'))
      .getValue('#pm_login #username')
      .then(username => {
        expect(username).equal(accountName);
      })
      .catch(testUtils.saveErrorShot.bind(this));
  });
});
