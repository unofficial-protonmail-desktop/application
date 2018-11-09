import { expect } from 'chai';
import sinon from 'sinon';
import webviewOnReady from './webview-on-ready';

describe('libs/webviewOnReady', () => {
  const callback = sinon.spy();

  afterEach(() => {
    callback.resetHistory();
  });

  it('should fire callback immediately if webview.isLoading isnt throwing an exception', () => {
    webviewOnReady({ isLoading: () => null }, callback);

    expect(callback).to.have.been.called;
  });

  it('should fire callback upon dom-ready if webview.isLoading is throwing an exception', () => {
    const webview = {
      addEventListener: sinon.spy(),
      isLoading: () => { throw Error(); },
      removeEventListener: sinon.spy(),
    };
    webviewOnReady(webview, callback);

    expect(callback).to.not.have.been.called;

    const domReadyCb = webview.addEventListener.withArgs('dom-ready').lastCall.args[1];
    domReadyCb();

    expect(callback).to.have.been.called;
    expect(webview.removeEventListener).to.have.been.calledWith('dom-ready', domReadyCb);
  });
});
