const { app, BrowserWindow }  = require('electron');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const pkgJson = require('../../package.json');

chai.use(sinonChai);

describe('App', () => {
  const sandbox = sinon.createSandbox();
  const originalPlatform = process.platform;

  beforeEach(() => {
    sandbox.stub(app, 'requestSingleInstanceLock').returns(true);
  });

  afterEach(() => {
    sandbox.restore();
    delete require.cache[require.resolve('./')];

    Object.defineProperty(process, 'platform', {
      value: originalPlatform,
    });
  });

  it('should not throw an exception upon ready', async () => {
    sandbox.spy(app, 'on');
    require('./');

    expect(app.on).to.have.been.called;

    const onReadyCb = app.on.getCalls().find(call => call.args[0] === 'ready').args[1];
    expect(async () => await onReadyCb()).to.not.throw();
  });

  it('should call setAppUserModelId with accurate value upon ready in win32', async () => {
    sandbox.spy(app, 'setAppUserModelId');
    sandbox.spy(app, 'on');
    require('./');

    const onReadyCb = app.on.getCalls().find(call => call.args[0] === 'ready').args[1];
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
