export const AddCommands = {
  addAccount: function () {
    this.app.client.addCommand('addAccount', accountName => {
      return this.app.client.waitUntilWindowLoaded()
        .waitForVisible('.add-account', 10000)
        .pause(500)
        .click('.add-account')
        .waitForVisible('.add-account-form')
        .setValue('[name=username]', accountName)
        .pause(500)
        .keys(['Enter'])
        .waitForVisible(`[href*=${accountName}]`)
    });
  },
};
