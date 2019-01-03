import cssOverrides from '!!css-to-string-loader!css-loader!sass-loader!../styles/protonmail_com.scss';
import * as contextMenu from 'electron-context-menu';
import prefillUsername from './webview-handler-prefill-username';
import getInjectableClassNameToggler from './get-injectable-class-name-toggler';
import * as webviewOnReady from './webview-on-ready';

const webviewStyle = 'position: absolute; top: 0; right: 0; bottom: 0; left: 0; visibility: hidden;';
const containerStyleVisible = 'position: relative; height: 100%;';
const containerStyleHidden = 'position: absolute; height: 0;';

/**
 * WebviewHandler manages all the webview elements and keeps
 * them outside of Reacts VDom, to persist their states.
 */

export class WebviewHandler {
  protonMailUrl =  'https://mail.protonmail.com/';
  protonMailBetaUrl =  'https://beta.protonmail.com/';

  static create() {
    const webviewHandler = new WebviewHandler();
    webviewHandler.container = null;
    webviewHandler.addedWebviews = [];
    webviewHandler.queuedCommands = [];

    return webviewHandler;
  }

  attachTo(elem) {
    this.container = elem;
    this.hide();

    if (this.queuedCommands.length) {
      this.queuedCommands.forEach(cmd => cmd());
    }
  }

  show() {
    if (!this.container) {
      return this._queueCommand(this.show.bind(this));
    }

    this.container.setAttribute('style', containerStyleVisible);
  }

  hide() {
    this.container.setAttribute('style', containerStyleHidden);
  }

  reload(name) {
    this._getWebview(name).reload();
  }

  displayView(name, { classNames } = {}) {
    if (!this.container) {
      return this._queueCommand(this.displayView.bind(this, name));
    }

    if (this.addedWebviews.indexOf(name) === -1) {
      /**
       * TODO: Remove? Is this ever reached?
       */
      this.addWebview(name);
    }

    this.container.querySelectorAll('webview')
      .forEach(elem => {
        elem.style.visibility = 'hidden';
        elem.removeAttribute('data-active');
      });

    const webview = this._getWebview(name);

    if (classNames) {
      webviewOnReady.default(
        webview,
        () => webview.executeJavaScript(getInjectableClassNameToggler(classNames))
      );
    }

    webviewOnReady.default(
      webview,
      () => webview.focus()
    );

    webview.style.visibility = 'visible';
    webview.setAttribute('data-active', true);
  }

  _getWebview(name) {
    return this.container.querySelector(`[data-name='${name}']`);
  }

  addWebview(name, url) {
    if (!this.container) {
      return this._queueCommand(this.displayView.bind(this, name, url));
    }

    const webview = document.createElement('webview');
    webview.setAttribute('src', url);
    webview.setAttribute('style', webviewStyle);
    webview.setAttribute('data-name', name);

    const domReadyCb = () => {
      webview.insertCSS(cssOverrides, 'utf8');

      webview.executeJavaScript('('.concat(prefillUsername, '(\'', name, '\'))'));
      webview.removeEventListener('dom-ready', domReadyCb);
    };
    webview.addEventListener('dom-ready', domReadyCb);

    this.container.appendChild(webview);
    this.addedWebviews = [...this.addedWebviews, name];

    window.requestIdleCallback(() => {
      contextMenu.default({
        window: webview
      });
    });

    return webview;
  }

  focusActive() {
    const webview = document.querySelector('webview[data-active=true]');

    if (webview) {
      webview.focus();
    }
  }

  _queueCommand(cmd) {
    this.queuedCommands = [...this.queuedCommands, cmd];
  }
}

export default WebviewHandler.create();
