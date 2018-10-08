import { expect } from 'chai';
import sinon from 'sinon';
import { ipcRenderer } from 'electron';
import { TOGGLE_SIDEBAR } from './containers/App/types';
import forwardIpcToStore from './forward-ipc-to-store';

describe('renderer/forwardIpcToStore', () => {
  const sandbox = sinon.createSandbox();
  const store = {
    dispatch: sinon.spy()
  };

  beforeEach(() => {
    sandbox.stub(ipcRenderer, 'on');
  });

  afterEach(() => {
    sandbox.restore();
    store.dispatch.resetHistory();
  });

  it('should listen for toggleSidebar event', () => {
    forwardIpcToStore();

    expect(ipcRenderer.on).to.have.been.calledWith('toggleSidebar');
  });

  it('should dispatch TOGGLE_SIDEBAR', () => {
    forwardIpcToStore(store);
    ipcRenderer.on.lastCall.args[1]();

    expect(store.dispatch).to.have.been.calledWith({
      type: TOGGLE_SIDEBAR
    });
  });
});
