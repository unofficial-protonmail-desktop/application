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
      .then(() => this.app.client.waitForVisible('.add-account', 10000))
      .click('.add-account')
      .then(() => this.app.client.waitForVisible('.add-account-form'))
      .setValue('[name=username]', accountName)
      .pause(500)
      .submitForm('.add-account-form')
      .pause(500)
      .getText(`[href*='${accountName}']`)
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
