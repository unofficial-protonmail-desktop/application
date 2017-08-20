import { expect } from 'chai';
import testUtils from './utils';
import { AddCommands } from './commands';

const path = require('path');

(process.env.PROTONMAIL_TEST_USERNAME ? describe : describe.skip)('unread notifications', function () {
  const expectUnreadEmails = 2;
  this.timeout(200000);
  
  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);
  
  it('should display accurate unread emails in the sidebar', async function () {
    AddCommands.addAccount.call(this);
    /**
     * We need to create to accounts since the webview wont get focus (which we need)
     * after an account is created.
     */
    await this.app.client.addAccount(process.env.PROTONMAIL_TEST_USERNAME);
    await this.app.client.addAccount(process.env.PROTONMAIL_TEST_USERNAME);
  
    return this.app.client
      .click('.etabs-tabs .etabs-tab:first-child')
      .pause(1000)
      .keys(['Tab'])
      .pause(1000)
      .keys(process.env.PROTONMAIL_TEST_PASSWORD)
      .pause(1000)
      .keys(['Enter'])
      .pause(5000)
      /**
       * Protonmail wont show unread emails in the title immediately,
       * therefore we need to visit the draft folder first
       */
      .keys('gd')
      .pause(1000)
      .keys('gi')
      .waitForVisible('.etabs-tabs .etabs-tab-badge')
      .getText('.etabs-tabs .etabs-tab-badge')
      .then(text => {
        expect(Number(text[0])).equal(expectUnreadEmails);
        expect(text[1]).equal('');
      });
  });
});
