import { expect } from 'chai';
import sinon from 'sinon';
import { shell } from 'electron';

import { UPDATE_UNREAD_EMAILS } from '../../containers/App/types';
import { WEBVIEW_ERROR } from './types';
import { monitorWebview, updateBadgeCount } from './actions';

const getCbForEventListener = (mockWebview, name) =>
  mockWebview.addEventListener.getCalls()
    .filter(call => call.args[0] === name)
    .map(call => call.args[1])
    .pop();

describe('middlewares/Webviews/actions', () => {
  const sandbox = sinon.createSandbox();
  const dispatch = sandbox.spy();
  const mockWebview = { addEventListener: sandbox.spy() };

  afterEach(() => {
    sandbox.resetHistory();
  });

  describe('monitorWebview', () => {
    it('should dispatch WEBVIEW_ERROR upon `did-fail-load`', () => {
      const name = 'albert';
      const error = new Error();

      monitorWebview(mockWebview, name)(dispatch);

      expect(mockWebview.addEventListener).to.have.been.calledWith('did-fail-load', sinon.match.func);

      getCbForEventListener(mockWebview, 'did-fail-load')(error);

      expect(dispatch).to.have.been.calledWith({
        type: WEBVIEW_ERROR,
        error,
        name,
      });
    });

    it('should dispatch WEBVIEW_ERROR upon `crashed`', () => {
      const name = 'lisa';

      monitorWebview(mockWebview, name)(dispatch);

      expect(mockWebview.addEventListener).to.have.been.calledWith('crashed', sinon.match.func);

      getCbForEventListener(mockWebview, 'crashed')();

      expect(dispatch).to.have.been.calledWith({
        error: sinon.match(error => {
          return error instanceof Error && error.errorDescription === 'CRASHED';
        }),
        name,
        type: WEBVIEW_ERROR,
      });
    });

    it('should dispatch WEBVIEW_ERROR upon `gpu-crashed`', () => {
      const name = 'eva';

      monitorWebview(mockWebview, name)(dispatch);

      expect(mockWebview.addEventListener).to.have.been.calledWith('gpu-crashed', sinon.match.func);

      getCbForEventListener(mockWebview, 'gpu-crashed')();

      expect(dispatch).to.have.been.calledWith({
        error: sinon.match(error => {
          return error instanceof Error && error.errorDescription === 'GPU_CRASHED';
        }),
        name,
        type: WEBVIEW_ERROR,
      });
    });

    it('should dispatch UPDATE_UNREAD_EMAILS upon `page-title-updated` containing `Inbox`', () => {
      const username = 'johan';
      const unreadEmails = 1337;

      monitorWebview(mockWebview, username)(dispatch);

      expect(mockWebview.addEventListener).to.have.been.calledWith('page-title-updated', sinon.match.func);

      getCbForEventListener(mockWebview, 'page-title-updated')({ title: `(${unreadEmails}) Outbox` });

      expect(dispatch).to.not.have.been.called;

      getCbForEventListener(mockWebview, 'page-title-updated')({ title: `(${unreadEmails}) Inbox` });
      expect(dispatch).to.have.been.calledWith({
        type: UPDATE_UNREAD_EMAILS,
        username,
        unreadEmails,
      });
    });

    it('should open external pages in a browser', () => {
      const url = 'https://sd.se/';
      const preventDefault = sinon.spy();
      sinon.stub(shell, 'openExternal');
      monitorWebview(mockWebview, 'agnes')(dispatch);

      expect(mockWebview.addEventListener).to.have.been.calledWith('new-window', sinon.match.func);
      getCbForEventListener(mockWebview, 'new-window')({ preventDefault, url });

      expect(preventDefault).to.have.been.calledWith();
      expect(shell.openExternal).to.have.been.calledWith(url);
    });
  });

  });
});
