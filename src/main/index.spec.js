const { app, ipcMain, BrowserWindow }  = require('electron');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const pkgJson = require('../../package.json');

chai.use(sinonChai);

describe('App', () => {
  const sandbox = sinon.createSandbox();
  const originalPlatform = process.platform;
  const getOnReadyCb = () => app.on.getCalls().find(call => call.args[0] === 'ready').args[1];

  beforeEach(() => {
    sandbox.stub(app, 'requestSingleInstanceLock').returns(true);
    sandbox.stub(ipcMain, 'on');
  });

  afterEach(() => {
    sandbox.restore();
    delete require.cache[require.resolve('./')];

    Object.defineProperty(process, 'platform', {
      value: originalPlatform,
    });
  });

  it('should listen for ipcMain notificationClick', async () => {
    sandbox.spy(BrowserWindow.prototype, 'show');
    sandbox.stub(app, 'on');
    require('./');
    const onReadyCb = getOnReadyCb();

    await onReadyCb();

    expect(ipcMain.on).to.have.been.calledWith('notificationClick', sinon.match.func);
    ipcMain.on.getCalls()
      .find(call => call.args[0] === 'notificationClick')
      .args[1]();

    expect(BrowserWindow.prototype.show).to.have.been.called;
  });

  it('should not throw an exception upon ready', async () => {
    sandbox.spy(app, 'on');
    require('./');

    expect(app.on).to.have.been.called;

    const onReadyCb = getOnReadyCb();
    expect(async () => await onReadyCb()).to.not.throw();
  });

  it('should call setAppUserModelId with accurate value upon ready in win32', async () => {
    sandbox.spy(app, 'setAppUserModelId');
    sandbox.spy(app, 'on');
    require('./');

    const onReadyCb = getOnReadyCb();
    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    await onReadyCb();

    expect(app.setAppUserModelId).to.have.been.calledWith(pkgJson.build.appId);
  });

  it('should call mainWindow.show when app is opened from taskbar in win32', () => {
    app.requestSingleInstanceLock.returns(true);
    require('./');

    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    sandbox.spy(BrowserWindow.prototype, 'show');
    sandbox.stub(BrowserWindow.prototype, 'isMinimized').returns(false);
    app.emit('second-instance');

    expect(BrowserWindow.prototype.show).to.have.been.called;
  });
});
