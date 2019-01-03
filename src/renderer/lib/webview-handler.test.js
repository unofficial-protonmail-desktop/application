import { expect } from 'chai';
import sinon from 'sinon';

import getInjectableClassNameToggler from './get-injectable-class-name-toggler';
import { WebviewHandler } from './webview-handler';
import prefillUsername from './webview-handler-prefill-username';
import * as webviewOnReady from './webview-on-ready';

describe('lib/WebviewHandler', () => {
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    window.requestIdleCallback = window.requestIdleCallback || (() => {});
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('create', () => {
    it('should return an appropriate WebviewHandler instance', () => {
      const webviewHandler = WebviewHandler.create();

      expect(webviewHandler.container).to.equal(null);
      expect(webviewHandler.addedWebviews).to.eql([]);
      expect(webviewHandler.queuedCommands).to.eql([]);
    });
  });

  describe('attachTo', () => {
    let webviewHandler;
    let mockElem;

    beforeEach(() => {
      webviewHandler = WebviewHandler.create();
      mockElem = { setAttribute: sinon.spy() };
    });

    it('should set container property', () => {
      webviewHandler.attachTo(mockElem);

      expect(webviewHandler.container).to.equal(mockElem);
    });

    it('should hide the webviewHandler', () => {
      sinon.spy(webviewHandler, 'hide');
      webviewHandler.attachTo(mockElem);

      expect(webviewHandler.hide).to.have.been.calledWith();
    });

    it('should run queued commands', () => {
      const queuedCommands = [
        sinon.spy(),
        sinon.spy(),
      ];
      webviewHandler.queuedCommands = queuedCommands;
      webviewHandler.attachTo(mockElem);

      queuedCommands
        .forEach(cmd => expect(cmd).to.have.been.calledWith());
    });
  });

  describe('show', () => {
    let webviewHandler;

    beforeEach(() => {
      webviewHandler = WebviewHandler.create();
    });

    it('should queue command and return if container doesnt exist', () => {
      sinon.spy(webviewHandler, '_queueCommand');
      webviewHandler.show();

      expect(webviewHandler._queueCommand).to.have.been.calledOnce;
    });

    it('should set container style', () => {
      const mockContainer = { setAttribute: sinon.spy() };
      webviewHandler.container = mockContainer;

      webviewHandler.show();

      expect(mockContainer.setAttribute).to.have.been.calledWith('style', sinon.match(/relative/g));
    });
  });

  describe('hide', () => {
    let webviewHandler;

    beforeEach(() => {
      webviewHandler = WebviewHandler.create();
    });

    it('should set container style to hide it', () => {
      const mockContainer = { setAttribute: sinon.spy() };
      webviewHandler.container = mockContainer;

      webviewHandler.hide();

      expect(mockContainer.setAttribute).to.have.been.calledWith('style', sinon.match(/absolute/));
    });
  });

  describe('reload', () => {
    let webviewHandler;

    beforeEach(() => {
      webviewHandler = WebviewHandler.create();
    });

    it('should call reload upon the webview', () => {
      const mockWebview = { reload: sinon.spy() };
      const name = 'albert';
      sinon.stub(webviewHandler, '_getWebview').returns(mockWebview);

      webviewHandler.reload(name);
      expect(webviewHandler._getWebview).to.have.been.calledWith(name);
      expect(mockWebview.reload).to.have.been.calledWith();
    });
  });

  describe('displayView', () => {
    let webviewHandler;

    beforeEach(() => {
      webviewHandler = WebviewHandler.create();
      webviewHandler.container = document.createElement('div');
    });

    it('should queue command and return if container doesnt exist', () => {
      sinon.spy(webviewHandler, '_queueCommand');
      webviewHandler.container = null;

      webviewHandler.displayView('name');

      expect(webviewHandler._queueCommand).to.have.been.called;
    });

    it('should set accurate visibility value to webviews that sould be hidden', () => {
      const name = 'sigrid';
      const webviewsToBeHidden = [document.createElement('webview'), document.createElement('webview')];
      const webviews = [document.createElement('webview'), ...webviewsToBeHidden];
      sinon.stub(webviewHandler, '_getWebview').returns(webviews[0]);
      sinon.stub(webviewHandler.container, 'querySelectorAll').returns(webviews);
      webviewHandler.addedWebviews = [name];

      webviewHandler.displayView(name);

      webviewsToBeHidden
        .forEach(webview => {
          expect(webview.style.visibility).to.equal('hidden');
          expect(webview.getAttribute('data-active')).to.equal(null);
        });
    });

    it('should set accurate visibility value webview that should be displayed', () => {
      const name = 'sigrid';
      const webviewToBeDisplayed = document.createElement('webview');
      const webviews = [document.createElement('webview')].concat(webviewToBeDisplayed);
      sinon.stub(webviewHandler, '_getWebview').returns(webviewToBeDisplayed);
      sinon.stub(webviewHandler.container, 'querySelectorAll').returns(webviews);
      sinon.spy(webviewToBeDisplayed, 'focus');
      webviewHandler.addedWebviews = [name];

      webviewHandler.displayView(name);

      expect(webviewToBeDisplayed.style.visibility).to.equal('visible');
      expect(webviewToBeDisplayed.getAttribute('data-active')).to.equal('true');
    });

    it('should inject JS to toggle classList upon dom-ready', () => {
      sandbox.stub(webviewOnReady, 'default');
      const webview = Object.assign(document.createElement('webview'), {
        executeJavaScript: () => null,
      });

      sinon.stub(webviewHandler, '_getWebview').returns(webview);
      sinon.stub(webview, 'addEventListener');
      sinon.stub(webview, 'executeJavaScript');
      const classNames = {
        lisa: false,
        mats: true,
      };

      webviewHandler.displayView('random', { classNames });

      expect(webviewOnReady.default).to.have.been.calledWith(webview);
      expect(webview.executeJavaScript).to.not.have.been.called;

      webviewOnReady.default.getCalls()
        .forEach(call => call.args[1]());
      expect(webview.executeJavaScript).to.have.been.calledWith(
        getInjectableClassNameToggler(classNames)
      );
    });

    it('should focus webview upon dom-ready', () => {
      sandbox.stub(webviewOnReady, 'default');
      const mockWebview = document.createElement('webview');
      sinon.spy(mockWebview, 'focus');
      sinon.stub(webviewHandler, '_getWebview').returns(mockWebview);

      webviewHandler.displayView('alfred');

      webviewOnReady.default.getCalls()
        .forEach(call => call.args[1]());

      expect(mockWebview.focus).to.have.been.calledWith();
    });
  });

  describe('_getWebview', () => {
    let webviewHandler;

    beforeEach(() => {
      webviewHandler = WebviewHandler.create();
      webviewHandler.container = document.createElement('div');
    });

    it('should return correct element', () => {
      const name = 'astrid';
      sinon.spy(webviewHandler.container, 'querySelector');


      webviewHandler._getWebview(name);

      expect(webviewHandler.container.querySelector).to.have.been.calledWith(`[data-name='${name}']`);
    });
  });

  describe('addWebview', () => {
    const sandbox = sinon.createSandbox();
    let webviewHandler;

    beforeEach(() => {
      webviewHandler = WebviewHandler.create();
      webviewHandler.container = { appendChild: sinon.spy() };
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should queue command and return if container doesnt exist', () => {
      sandbox.spy(webviewHandler, '_queueCommand');
      webviewHandler.container = null;

      webviewHandler.addWebview('name');

      expect(webviewHandler._queueCommand).to.have.been.called;
    });

    it('should create webview element and append to container', () => {
      const mockElem = {
        setAttribute: sinon.spy(),
        addEventListener: sinon.spy(),
      };
      const name = 'beatrice';
      sandbox.stub(document, 'createElement').returns(mockElem);
      const url =  'https://something.protonmail.com/';

      const webview = webviewHandler.addWebview(name, url);

      expect(webview).to.equal(mockElem);

      expect(document.createElement).to.have.been.calledWith('webview');
      expect(mockElem.setAttribute).to.have.been.calledWith('src', url);
      expect(mockElem.setAttribute).to.have.been.calledWith('style', sinon.match(/absolute/));
      expect(mockElem.setAttribute).to.have.been.calledWith('data-name', name);

      expect(webviewHandler.container.appendChild).to.have.been.calledWith(mockElem);
      expect(webviewHandler.addedWebviews).to.eql([name]);
    });

    it('should inject custom CSS when the DOM is ready', () => {
      const mockElem = {
        addEventListener: sinon.spy(),
        executeJavaScript: sinon.spy(),
        insertCSS: sinon.spy(),
        removeEventListener: sinon.spy(),
        setAttribute: sinon.spy(),
      };
      sandbox.stub(document, 'createElement').returns(mockElem);

      const webview = webviewHandler.addWebview('lars');

      expect(webview.addEventListener).to.have.been.calledWith('dom-ready', sinon.match.func);

      const insertCSSFn = webview.addEventListener.getCalls()
        .filter(call => call.args[0] === 'dom-ready')
        .map(call => call.args[1])
        .pop();
      insertCSSFn();

      expect(webview.insertCSS).to.have.been.calledWith(sinon.match.any, 'utf8');
      expect(webview.removeEventListener).to.have.been.calledWith('dom-ready', insertCSSFn);
    });

    it('should prefill the username when the DOM is ready', () => {
      const mockElem = {
        addEventListener: sinon.spy(),
        executeJavaScript: sinon.spy(),
        insertCSS: sinon.spy(),
        removeEventListener: sinon.spy(),
        setAttribute: sinon.spy(),
      };
      const username = 'anders';
      sandbox.stub(document, 'createElement').returns(mockElem);

      const webview = webviewHandler.addWebview(username);

      expect(webview.addEventListener).to.have.been.calledWith('dom-ready', sinon.match.func);

      const domReadyFn = webview.addEventListener.getCalls()
        .filter(call => call.args[0]=== 'dom-ready')
        .map(call => call.args[1])
        .pop();
      domReadyFn();

      expect(webview.executeJavaScript).to.have.been.calledWith('('.concat(prefillUsername, `('${username}')`, ')'));
      expect(webview.removeEventListener).to.have.been.calledWith('dom-ready', domReadyFn);
    });
  });

  describe('focusActive', () => {
    const sandbox = sinon.createSandbox();
    let webviewHandler;

    beforeEach(() => {
      webviewHandler = WebviewHandler.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call focus on accurate element', () => {
      const mockElem = { focus: sinon.spy() };
      sandbox.stub(document, 'querySelector').returns(mockElem);
      webviewHandler.focusActive();

      expect(mockElem.focus).to.have.been.calledOnce;
    });
  });
});
