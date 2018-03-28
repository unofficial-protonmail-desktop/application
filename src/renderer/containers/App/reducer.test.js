import { expect } from 'chai';

import { RELOAD_WEBVIEW, WEBVIEW_ERROR } from '../../middlewares/Webviews/types';
import { ADD_ACCOUNT, REMOVE_ACCOUNT, UPDATE_SETTINGS } from './types';
import App from './reducer';

describe('containers/App/reducer', () => {
  it('should provide empty accounts as initial state', () => {
    expect(App(undefined, {}).accounts).to.eql({});
  });

  it('should store account upon ADD_ACCOUNT', () => {
    const account = {
      username: 'alice',
    };

    expect(App(undefined, { account, type: ADD_ACCOUNT }).accounts).to.eql({
      [account.username]: account,
    });
  });

  it('should remve account from store upon REMOVE_ACCOUNT', () => {
    const account = {
      username: 'bob',
    };
    expect(App({ accounts: { [account.username]: account } }, { account, type: REMOVE_ACCOUNT }).accounts).to.eql({});
  });

  it('should provide default settings as initial state', () => {
    expect(App(undefined, {}).settings).to.eql({
      darkTheme: false,
    });
  });

  it('should store setting upon UPDATE_SETTINGS', () => {
    const key = 'lightTheme';
    const value = false;

    expect(App({}, { key, value, type: UPDATE_SETTINGS }).settings).to.eql({
      [key]: value,
    });
  });

  it('should assign an empty object to webviewStatuses as initial value', () => {
    expect(App(undefined, {}).webviewStatuses).to.eql({});
  });

  it('should clear webviewStatuses for username upon RELOAD_WEBVIEW', () => {
    const name = 'jesper';
    const initialState = { 
      webviewStatuses: { 
        [name]: { error: '' },
      },
    };
    expect(App(initialState, { type: RELOAD_WEBVIEW, name }).webviewStatuses[name]).to.eql({});
  });

  it('should store webview error in webviewStatuses upon WEBVIEW_ERROR', () => {
    const name = 'albin';
    const error = 'this is the error';

    expect(App(undefined, { type: WEBVIEW_ERROR, name, error }).webviewStatuses[name]).to.eql({
      error,
    });
  });
});
