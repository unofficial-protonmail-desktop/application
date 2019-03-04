import { expect } from 'chai';
import sinon from 'sinon';

describe('renderer/store', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    jest.resetModules();
    sandbox.restore();
  });

  it('should migrate initialState with accounts as an object', () => {
    const account = { first: 'account' };
    const oldState = {
      accounts: {
        first: account,
      },
    };
    sandbox.stub(localStorage.__proto__, 'getItem').withArgs('appState').returns(JSON.stringify(oldState));
    global.localStorage = {};
    const store = require('./store').default;
    const state = store.getState();

    expect(state.accounts).to.eql([
      account
    ]);
  });
});
