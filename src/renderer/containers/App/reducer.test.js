import { expect } from 'chai';

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

  it('should remve account frmo store upon REMOVE_ACCOUNT', () => {
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
});
