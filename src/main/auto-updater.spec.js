const { app, dialog }  = require('electron');
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
});
