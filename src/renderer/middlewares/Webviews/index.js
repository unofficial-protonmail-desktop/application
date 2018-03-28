import WebviewHandler from '../../lib/webview-handler';
import {
  DISPLAY_WEBVIEW,
  HIDE_WEBVIEWS,
  RELOAD_WEBVIEW,
} from './types';
import { monitorWebview } from './actions';

const createdWebviews = {};
const WebviewsMiddleware = ({ dispatch }) => next => action => {

  switch (action.type) {
  case DISPLAY_WEBVIEW:
    if (!createdWebviews[action.name]) {
      const webview = WebviewHandler.addWebview(action.name);
      dispatch(monitorWebview(webview, action.name));
      createdWebviews[action.name] = true;
    }

    WebviewHandler.show();
    WebviewHandler.displayView(action.name);
    break;
  case HIDE_WEBVIEWS:
    WebviewHandler.hide();
    break;
  case RELOAD_WEBVIEW:
    WebviewHandler.reload(action.name);
    break;
  }

  return next(action);
};

export default WebviewsMiddleware;
