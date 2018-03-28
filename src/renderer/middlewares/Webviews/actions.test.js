import { expect } from 'chai';
import sinon from 'sinon';

import { WEBVIEW_ERROR } from './types';
import { monitorWebview } from './actions';

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
  });
});
