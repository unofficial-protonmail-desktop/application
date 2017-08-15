import { expect } from 'chai';
import testUtils from './utils';
import { AddCommands } from './commands';

const path = require('path');

describe('unread notifications', function () {
  const expectUnreadEmails = 7;
  this.timeout(20000);
  
  beforeEach(function () {
    return testUtils.beforeEach.call(this, {
      PROTONMAIL_LOGIN_URL: path.resolve(`./e2e/mocks/${expectUnreadEmails}-unread-emails.html`),
    });
  });
  afterEach(testUtils.afterEach);
  
  it('should display accurate unread emails in the sidebar', async function () {
    AddCommands.addAccount.call(this);
    await this.app.client.addAccount('proton@rocks.me');
  
    return this.app.client
      .pause(5000)
      .waitForVisible('.etabs-tabs .etabs-tab-badge')
      .getText('.etabs-tabs .etabs-tab-badge')
      .then(text => {
        expect(Number(text)).equal(expectUnreadEmails);
      });
  });
});
