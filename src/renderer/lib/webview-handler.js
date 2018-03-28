const webviewStyle = 'position: absolute; top: 0; right: 0; bottom: 0; left: 0; visibility: hidden;';
const containerStyleVisible = 'position: relative; height: 100%;';
const containerStyleHidden = 'position: absolute; height: 0;';

/**
 * WebviewHandler manages all the webview elements and keeps
 * them outside of Reacts VDom, to persist their states.
 */

export class WebviewHandler {
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

  displayView(name) {
    if (!this.container) {
      return this._queueCommand(this.displayView.bind(this, name));
    }

    if (this.addedWebviews.indexOf(name) === -1) {
      this.addWebview(name);
    }

    this.container.querySelectorAll('webview')
      .forEach(elem => {
        elem.style.visibility = 'hidden';
      });
    this._getWebview(name).style.visibility = 'visible';
  }

  _getWebview(name) {
    return this.container.querySelector(`[data-name='${name}']`);
  }

  addWebview(name) {
    if (!this.container) {
      return this._queueCommand(this.displayView.bind(this, name));
    }

    const webview = document.createElement('webview');
    webview.setAttribute('src', 'https://mail.protonmail.com/');
    webview.setAttribute('style', webviewStyle);
    webview.setAttribute('data-name', name);

    this.container.appendChild(webview);
    this.addedWebviews = [...this.addedWebviews, name];

    return webview;
  }

  _queueCommand(cmd) {
    this.queuedCommands = [...this.queuedCommands, cmd];
  }
}

export default WebviewHandler.create();
