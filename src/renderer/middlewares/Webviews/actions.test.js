import { expect } from 'chai';
import sinon from 'sinon';

import { WEBVIEW_ERROR } from './types';
import { monitorWebview } from './actions';

describe('middlewares/Webviews/actions', () => {
  describe('monitorWebview', () => {
    it('should dispatch WEBVIEW_ERROR upon `did-fail-load`', () => {
      const name = 'albert';
      const error = new Error();
      const dispatch = sinon.spy();
      const mockWebview = { addEventListener: sinon.spy() };

      monitorWebview(mockWebview, name)(dispatch);

      expect(mockWebview.addEventListener).to.have.been.calledWith('did-fail-load', sinon.match.func);

      mockWebview.addEventListener.getCall(0).args[1](error);

      expect(dispatch).to.have.been.calledWith({
        type: WEBVIEW_ERROR,
        error,
        name,
      });
    });
  });
});
