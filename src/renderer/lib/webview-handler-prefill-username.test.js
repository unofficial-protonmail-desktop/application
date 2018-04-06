import { expect } from 'chai';
import sinon from 'sinon';

import prefillUsername from './webview-handler-prefill-username';

describe('lib/WebviewHandler/PrefillUsername', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('should execute at an interval of 100 ms', () => {
    sandbox.stub(window, 'setInterval');
    
    prefillUsername('albert');

    expect(window.setInterval).to.have.been.calledWith(sinon.match.func, 100);
  });

  it('should let the interval run until username input field is found', () => {
    sandbox.stub(document, 'querySelector');
    const fakeTimers = sandbox.useFakeTimers();

    prefillUsername('kristina');
    fakeTimers.tick(100);

    expect(document.querySelector).to.have.been.calledWith('[name=username]');

    document.querySelector.returns({});
    fakeTimers.tick(100);

    expect(document.querySelector).to.have.been.calledTwice;

    fakeTimers.tick(100);
    expect(document.querySelector).to.have.been.calledTwice;
  });

  it('should set the input field value to given username', () => {
    const username = 'lena';
    const mockDomElem = {};
    sandbox.stub(document, 'querySelector').returns(mockDomElem);
    const fakeTimers = sandbox.useFakeTimers();

    prefillUsername(username);
    fakeTimers.tick(100);

    expect(mockDomElem.value).to.equal(username);
  });
});
