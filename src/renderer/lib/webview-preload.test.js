import { expect } from 'chai';
import sinon from 'sinon';
import { ipcRenderer } from 'electron';

describe('/renderer/li/webview-preload', () => {
  const sandbox = sinon.createSandbox();
  let originalNotification;

  beforeEach(() => {
    originalNotification = sinon.stub();
    window.Notification = originalNotification;
    require('./webview-preload');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should ipcRenderer.sendToHost upon click event', () => {
    const mockNoti = document.createElement('div');
    originalNotification.returns(mockNoti);
    ipcRenderer.sendToHost = sinon.spy();

    const noti = new Notification('read this');

    const event = new MouseEvent('click', { bubbles: true, cancelable: false });
    noti.dispatchEvent(event);

    expect(ipcRenderer.sendToHost).to.have.been.calledWith('notificationClick');
  });
});
