import { expect } from 'chai';
import sinon from 'sinon';
import { ipcRenderer } from 'electron';
import { updateIconBadge } from './actions';

describe('containers/App/actions', () => {
  const sandbox = sinon.createSandbox();
  const dispatch = sandbox.spy();

  afterEach(() => {
    sandbox.restore();
  });

  describe('updateIconBadge', () => {
    it('should send an IPC message with accurate value', () => {
      const mockState = {
        accounts: {
          ove: { unreadEmails: 10 },
          adam: { unreadEmails: 12 },
        },
      };
      sandbox.stub(ipcRenderer, 'send');
      updateIconBadge()(dispatch, () => mockState);

      expect(ipcRenderer.send).to.have.been.calledWith('set-badge', 22);
    });
  });
});
