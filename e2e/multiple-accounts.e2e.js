import { expect } from 'chai';
import testUtils from './utils';

describe('multiple accounts', function () {
  this.timeout(20000);
  
  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);

  it('creates a new tab when account is added', function () {
    const accountName = 'awesomeMail';
    
    return this.app.client.waitUntilWindowLoaded()
      .waitForVisible('button.add-account', 10000)
      .pause(500)
      .click('button.add-account')
      .waitForVisible('.sweet-alert input[type=text]')
      .setValue('.sweet-alert input[type=text]', accountName)
      .pause(500)
      .click('button.confirm')
      .getText('.etabs-tabs .etabs-tab-title')
      .then(text => {
        expect(typeof text).equal('string');
        expect(text.toLowerCase()).equal(accountName.slice(0, 1).toLowerCase());
      })
      .then(() => {
        const webContents = this.app.webContents.getAllWebContents();
        expect(webContents.length).equal(1);
        
        return Promise.resole(webContents[0]);
      });
  });
  
  it('should load stored accounts', function () {
    return this.app.client.waitUntilWindowLoaded()
      .waitForVisible('.etabs-tabs')
      .elements('.etabs-tabs .etabs-tab')
      .then(tabs => {
        expect(tabs.value.length).equal(1);
      });
  });
});
