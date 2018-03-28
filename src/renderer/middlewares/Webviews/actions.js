import { WEBVIEW_ERROR } from './types';

export const monitorWebview = (webview, name) => {
  return dispatch => {
    webview.addEventListener('did-fail-load', error => {
      dispatch({
        type: WEBVIEW_ERROR,
        error,
        name,
      });
    });

    webview.addEventListener('crashed', () => {
      const error = new Error();
      error.errorDescription = 'CRASHED';

      dispatch({
        type: WEBVIEW_ERROR,
        error,
        name,
      });
    });

    webview.addEventListener('gpu-crashed', () => {
      const error = new Error();
      error.errorDescription = 'GPU_CRASHED';

      dispatch({
        type: WEBVIEW_ERROR,
        error,
        name,
      });
    });
  };
};
