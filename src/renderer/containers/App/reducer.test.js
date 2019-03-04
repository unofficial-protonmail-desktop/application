import { expect } from 'chai';

import { RELOAD_WEBVIEW, WEBVIEW_ERROR } from '../../middlewares/Webviews/types';
import { ADD_ACCOUNT, REMOVE_ACCOUNT, TOGGLE_SIDEBAR, TOGGLE_SIDEBAR_ITEM_POSITION, UPDATE_SETTINGS, UPDATE_UNREAD_EMAILS } from './types';
import App from './reducer';

describe('containers/App/reducer', () => {
  it('should provide empty accounts as initial state', () => {
    expect(App(undefined, {}).accounts).to.eql([]);
  });

  it('should store account upon ADD_ACCOUNT', () => {
    const account = {
      username: 'alice',
    };

    expect(App(undefined, { account, type: ADD_ACCOUNT }).accounts).to.contain(account);
  });

  it('should remve account from store upon REMOVE_ACCOUNT', () => {
    const account = {
      username: 'bob',
    };

    expect(App({ accounts: [account] }, { username: account.username, type: REMOVE_ACCOUNT }).accounts).to.eql([]);
  });

  it('should toggle hideSidebar upon TOGGLE_SIDEBAR', () => {
    const initialState = {
      settings: {
        hideSidebar: true,
      }
    };
    expect(App(initialState, { type: TOGGLE_SIDEBAR }).settings.hideSidebar).to.equal(false);
  });

  it('should toggle account positions upon TOGGLE_SIDEBAR_ITEM_POSITION', () => {
    const accounts = [
      'a',
      'b',
      'c',
    ];

    expect(App({ accounts }, { type: TOGGLE_SIDEBAR_ITEM_POSITION, from: 0, to: 2 })).to.eql({
      accounts: [
        'b',
        'c',
        'a',
      ],
    });
  });

  it('should provide default settings as initial state', () => {
    expect(App(undefined, {}).settings).to.eql({
      darkTheme: false,
      hideSidebar: false,
      useProtonMailBeta: false,
    });
  });

  it('should store setting upon UPDATE_SETTINGS', () => {
    const key = 'lightTheme';
    const value = false;

    expect(App({}, { key, value, type: UPDATE_SETTINGS }).settings).to.contain({
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
  
  it('should store unreadEmails upon UPDATE_UNREAD_EMAILS', () => {
    const username = 'mona';
    const unreadEmails = 2018;
    const initialState = { accounts: [{ username }] };

    expect(App(initialState, { type: UPDATE_UNREAD_EMAILS, username, unreadEmails }).accounts).to.deep.include({
      unreadEmails,
      username,
    });
  });
});
