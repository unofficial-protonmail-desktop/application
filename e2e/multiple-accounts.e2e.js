import { expect } from 'chai';
import testUtils from './utils';
import { AddCommands } from './commands';

describe('multiple accounts', function () {
  this.timeout(20000);

  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);

  it('creates a new tab when account is added', async function () {
    const accountName = 'awesomeMail';

    await this.app.client.waitUntilWindowLoaded()
      .waitForVisible('.add-account', 10000)
      .click('.add-account')
      .waitForVisible('.add-account-form')
      .setValue('[name=username]', accountName)
      .pause(500)
      .submitForm('.add-account-form')
      .pause(500)

    const actualTabName = await this.app.client
      .getText(`[href*='${accountName}']`);

    expect(typeof actualTabName).equal('string');
    expect(actualTabName.toLowerCase()).equal(accountName.slice(0, 1).toLowerCase());
  });

  it('auto fills the username', async function () {
    AddCommands.addAccount.call(this);

    await this.app.client.waitUntilWindowLoaded();

    const accountName = 'jesper';
    await this.app.client.addAccount(accountName);

    await this.app.client.pause(3000);

    const inputSelector = '#pm_login #username';

    await this.app.client
      .then(() => this.app.client.waitUntilWindowLoaded())
      .getWindowCount()
      .then(count => this.app.client.windowByIndex(count-1))
      .waitForVisible(inputSelector);

    await this.app.client
      .waitUntil(async () => await !!this.app.client.getValue(inputSelector));
    await this.app.client.pause(1000);

    const actualUsername = await this.app.client
      .getValue(inputSelector);

    expect(actualUsername).equal(accountName);
  });
});
