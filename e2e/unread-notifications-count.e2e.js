import { expect } from 'chai';
import testUtils from './utils';
import { AddCommands } from './commands';

(process.env.PROTONMAIL_TEST_USERNAME ? describe : describe.skip)('unread notifications', function () {
  const expectUnreadEmails = 2;
  this.timeout(200000);
  this.retries(3);

  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);

  it('should display accurate unread emails in the sidebar', async function () {
    AddCommands.addAccount.call(this);

    await this.app.client.waitUntilWindowLoaded();

    /**
     * We need to create to accounts since the webview wont get focus (which we need)
     * after an account is created.
     */
    const accountName = process.env.PROTONMAIL_TEST_USERNAME;
    await this.app.client.addAccount(accountName);

    await this.app.client.pause(1000);

    return this.app.client
      .pause(2000)
      .keys(['Tab'])
      .pause(2000)
      .keys(process.env.PROTONMAIL_TEST_PASSWORD)
      .pause(2000)
      .keys(['Enter'])
      .pause(10000)
      /**
       * Protonmail wont show unread emails in the title immediately,
       * therefore we need to visit the draft folder first
       */
      .keys('gd')
      .pause(2000)
      .keys('gi')
      .then(() => this.app.client.waitForVisible('.notifications'))
      .then(() => this.app.client.getText('.notifications'))
      .then(text => {
        expect(Number(text[0])).equal(expectUnreadEmails);
        expect(text[1]).equal('');
      })
      .catch(() => {
        testUtils.saveErrorShot.bind(this);
        testUtils.printElectronLogs.bind(this);
      })
  });
});
