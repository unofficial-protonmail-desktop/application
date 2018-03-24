import { WEBVIEW_ERROR } from './types';

export const monitorWebview = (webview, name) => {
  return dispatch => {
    /**
     * TODO: ADd event listeners for crash, etc
     */

    webview.addEventListener('did-fail-load', error => {
      dispatch({
        type: WEBVIEW_ERROR,
        error,
        name,
      });
    });
  };
};
