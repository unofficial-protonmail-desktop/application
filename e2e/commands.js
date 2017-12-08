export const AddCommands = {
  addAccount: function () {
    this.app.client.addCommand('addAccount', accountName => {
      return this.app.client.waitUntilWindowLoaded()
        .waitForVisible('button.add-account', 10000)
        .pause(500)
        .click('button.add-account')
        .waitForVisible('.swal2-input')
        .setValue('.swal2-input', accountName)
        .pause(500)
        .click('.swal2-confirm')
        .waitForVisible('.swal2-input', undefined, true)
    });
  },
};
