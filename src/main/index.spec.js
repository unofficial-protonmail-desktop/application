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
    sandbox.stub(app, 'on');
    sandbox.stub(ipcMain, 'on');
    sandbox.stub(BrowserWindow.prototype, 'loadURL');
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
    require('./');

    expect(app.on).to.have.been.called;

    const onReadyCb = getOnReadyCb();
    expect(async () => await onReadyCb()).to.not.throw();
  });

  it('should call setAppUserModelId with accurate value upon ready in win32', async () => {
    sandbox.spy(app, 'setAppUserModelId');
    require('./');

    const onReadyCb = getOnReadyCb();
    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    await onReadyCb();

    expect(app.setAppUserModelId).to.have.been.calledWith(pkgJson.build.appId);
  });

  it('should call mainWindow.show when app is opened from taskbar in win32', async () => {
    app.requestSingleInstanceLock.returns(true);
    require('./');

    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    sandbox.stub(BrowserWindow.prototype, 'show');
    sandbox.stub(BrowserWindow.prototype, 'isMinimized').returns(false);

    await getOnReadyCb()();

    app.on.getCalls()
      .find(({ args }) => args[0] === 'second-instance')
      .args[1]();

    expect(BrowserWindow.prototype.show).to.have.been.called;
  });
});
