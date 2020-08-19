const { BrowserWindow }  = require('electron');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

const jetpack = require('fs-jetpack');
const window = require('./window').default;

chai.use(sinonChai);

describe('helpers/window', () => {
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.stub(BrowserWindow.prototype, 'on');
    const write = sinon.spy();
    sandbox.stub(jetpack, 'cwd').returns({
      read: () => null,
      write,
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should listen on BrowserWindow close event', () => {
    expect(BrowserWindow.prototype.on).to.not.have.been.called;

    window('name', {});

    expect(BrowserWindow.prototype.on).to.have.been.calledWith('close', sinon.match.func);
  });

  it('should call saveState with accurate options upon close', () => {
    const x = 1;
    const y = 2;
    const width = 3;
    const height = 4;
    sandbox.stub(BrowserWindow.prototype, 'getPosition').returns([x, y]);
    sandbox.stub(BrowserWindow.prototype, 'getSize').returns([width, height]);
    sandbox.stub(BrowserWindow.prototype, 'isMinimized').returns(false);
    window('name', {});

    const saveState = BrowserWindow.prototype.on.getCalls()
      .find(({args}) => args[0] === 'close').args[1];

    saveState();

    expect(jetpack.cwd().write).to.have.been.calledOnceWith(sinon.match.string, sinon.match({
      x,
      y,
      width,
      height,
    }));
  });
});
