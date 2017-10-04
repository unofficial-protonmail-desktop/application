export const AddCommands = {
  addAccount: function () {
    this.app.client.addCommand('addAccount', accountName => {
      return this.app.client.waitUntilWindowLoaded()
        .waitForVisible('button.add-account', 10000)
        .pause(500)
        .click('button.add-account')
        .waitForVisible('.sweet-alert input[type=text]')
        .setValue('.sweet-alert input[type=text]', accountName)
        .pause(500)
        .click('button.confirm')
        .waitForVisible('.sweet-alert input[type=text]', undefined, true)
    });
  },
};
