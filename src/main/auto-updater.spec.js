const { app, dialog, shell }  = require('electron');
const { autoUpdater } = require('electron-updater');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

const { initiateAutoUpdater } = require('./auto-updater');

describe('AutoUpdater', () => {
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.stub(autoUpdater, 'checkForUpdatesAndNotify');
    sandbox.stub(autoUpdater, 'checkForUpdates');
    sandbox.spy(autoUpdater, 'on');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should check for updates on app ready', () => {
    sandbox.spy(app, 'on');
    autoUpdater.checkForUpdatesAndNotify.returns(Promise.resolve());

    initiateAutoUpdater({});

    const onAppReadyCb = app.on.getCalls().filter(call => call.calledWith('ready')).pop().args[1];
    onAppReadyCb();

    expect(autoUpdater.checkForUpdatesAndNotify).to.have.been.called;
  });

  it('should show a dialog when an error occurs', () => {
    sandbox.stub(dialog, 'showMessageBox');

    initiateAutoUpdater({});

    const onAutoUpdaterErrorCb = autoUpdater.on.getCalls().filter(call => call.calledWith('error')).pop().args[1];
    onAutoUpdaterErrorCb({});

    expect(autoUpdater.on).to.have.been.called;
    expect(dialog.showMessageBox).to.have.been.called;
  });

  describe('auto update not supported', () => {
    let onReady;

    beforeEach(() => {
      sandbox.stub(dialog, 'showMessageBox');
      autoUpdater.checkForUpdatesAndNotify.returns(Promise.resolve(null));
      onReady = sandbox.stub(app, 'on').withArgs('ready');
    });

    it('should show a dialog when update-available occurs', async () => {
      initiateAutoUpdater();
      await onReady.lastCall.args[1]();
      autoUpdater.emit('update-available', { releaseNotes: '' });

      expect(dialog.showMessageBox).to.have.been.called;
    });

    it('should open external application to download when the user clicks on the first button', async () => {
      sandbox.stub(shell, 'openExternal');

      initiateAutoUpdater();
      await onReady.lastCall.args[1]();
      autoUpdater.emit('update-available', { releaseNotes: '' });

      const onDialogClick = dialog.showMessageBox.lastCall.args[2];
      onDialogClick(0);

      expect(shell.openExternal).to.have.been.calledWith(sinon.match(/https/));
    });
  });
});
