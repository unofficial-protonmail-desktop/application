import { expect } from 'chai';
import sinon from 'sinon';
import StatePersist from './';

describe('renderer/middelwares/StatePersist', () => {
  const sandbox = sinon.createSandbox();
  const getState = sandbox.spy();
  const next = sandbox.spy();

  beforeAll(() => {
    window.localStorage = window.localStorage || { setItem: () => undefined };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return value from next', () => {
    const expectedResult = { return: 'me' };
    const result = StatePersist({ getState })(() => expectedResult)({});

    expect(result).to.equal(expectedResult);
  });

  it('should store state in local storage', () => {
    const mockState = { mock: 'state' };
    sandbox.stub(window.localStorage, 'setItem');
    StatePersist({ getState: () => mockState })(next)({ action: '' });

    expect(next).to.have.been.calledOnce;
    expect(window.localStorage.setItem).to.have.been.calledWith('appState', JSON.stringify(mockState));
    expect(next).calledBefore(window.localStorage.setItem);
  });
});
