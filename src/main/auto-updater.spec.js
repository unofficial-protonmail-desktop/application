const { app, dialog }  = require('electron');
const { autoUpdater } = require('electron-updater');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

const { initiateAutoUpdater } = require('./auto-updater');

describe('AutoUpdater', () => {
  it('should check for updates on app ready', () => {
    sinon.stub(autoUpdater, 'checkForUpdates');
    sinon.spy(app, 'on');

    initiateAutoUpdater();

    const onAppReadyCb = app.on.getCalls().filter(call => call.calledWith('ready')).pop().args[1];
    onAppReadyCb();

    expect(autoUpdater.checkForUpdates).to.have.been.called;
    autoUpdater.checkForUpdates.restore();
  });

  it('should show a dialog when an error occurs', () => {
    sinon.stub(dialog, 'showMessageBox');
    sinon.spy(autoUpdater, 'on');

    initiateAutoUpdater();

    const onAutoUpdaterErrorCb = autoUpdater.on.getCalls().filter(call => call.calledWith('error')).pop().args[1];
    onAutoUpdaterErrorCb();

    expect(dialog.showMessageBox).to.have.been.called;
    dialog.showMessageBox.restore();
  });

  it('should show adialog when a new update has downloaded', () => {
    sinon.stub(dialog, 'showMessageBox');

    initiateAutoUpdater();
    autoUpdater.emit('update-downloaded', { releaseNotes: '' });

    expect(dialog.showMessageBox).to.have.been.called;
    dialog.showMessageBox.restore();
  });
});
