const { app }  = require('electron');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

describe('App', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('should not throw an exception upon ready', async () => {
    sandbox.spy(app, 'on');
    sandbox.stub(app, 'requestSingleInstanceLock').returns(true);
    require('./');

    expect(app.on).to.have.been.called;

    const onReadyCb = app.on.getCalls().find(call => call.args[0] === 'ready').args[1];
    expect(async () => await onReadyCb()).to.not.throw();
  });
});
