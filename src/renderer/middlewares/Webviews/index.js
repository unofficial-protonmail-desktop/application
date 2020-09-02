import { ipcRenderer } from 'electron';
import WebviewHandler from '../../lib/webview-handler';
import {
  DISPLAY_WEBVIEW,
  HIDE_WEBVIEWS,
  RELOAD_WEBVIEW,
  UPDATE_UNREAD_EMAILS,
} from './types';
import { monitorWebview, updateBadgeCount } from './actions';

const createdWebviews = {};

const WebviewsMiddleware = ({ dispatch }) => next => action => {
  switch (action.type) {
  case DISPLAY_WEBVIEW:
    if (!createdWebviews[action.name]) {
      const url = action.useBeta ? WebviewHandler.protonMailBetaUrl : WebviewHandler.protonMailUrl;
      const webview = WebviewHandler.addWebview(action.name, url);
      dispatch(monitorWebview(webview, action.name));
      createdWebviews[action.name] = true;

      webview.addEventListener('ipc-message', (event) => {
        if (event.channel === 'notificationClick') {
          ipcRenderer.send('notificationClick', event);

          window.location.assign(`#/mailbox/${action.name}`);
        }
      });
    }

    WebviewHandler.show();
    WebviewHandler.displayView(action.name, {
      classNames: {
        darkTheme: !!action.darkTheme
      }
    });

    window.addEventListener('focus', WebviewHandler.focusActive);
    break;
  case HIDE_WEBVIEWS:
    WebviewHandler.hide();
    window.removeEventListener('focus', WebviewHandler.focusActive);
    break;
  case RELOAD_WEBVIEW:
    WebviewHandler.show();
    WebviewHandler.reload(action.name);
    break;
  case UPDATE_UNREAD_EMAILS:
    updateBadgeCount(action.unreadEmails);
  }

  return next(action);
};

export default WebviewsMiddleware;
