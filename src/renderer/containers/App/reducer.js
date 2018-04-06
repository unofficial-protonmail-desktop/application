import { RELOAD_WEBVIEW, WEBVIEW_ERROR } from '../../middlewares/Webviews/types';
import { ADD_ACCOUNT, REMOVE_ACCOUNT, UPDATE_SETTINGS, UPDATE_UNREAD_EMAILS } from './types';

const initialState = {
  accounts: {},
  settings: {
    darkTheme: false,
  },
  webviewStatuses: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ADD_ACCOUNT:
    return {
      ...state,
      accounts: {
        ...state.accounts,
        [action.account.username]: action.account,
      },
    };
  case REMOVE_ACCOUNT:
    const { [action.account.username]: omit, ...accounts } = state.accounts;
    return {
      ...state,
      accounts,
    };
  case UPDATE_SETTINGS:
    return {
      ...state,
      settings: {
        ...state.settings,
        [action.key]: action.value,
      },
    };
  case RELOAD_WEBVIEW:
    return {
      ...state,
      webviewStatuses: {
        ...state.webviewStatuses,
        [action.name]: {},
      },
    };
  case WEBVIEW_ERROR:
    return {
      ...state,
      webviewStatuses: {
        ...state.webviewStatuses,
        [action.name]: {
          error: action.error,
        },
      },
    };

  case UPDATE_UNREAD_EMAILS:
    return {
      ...state,
      accounts: {
        ...state.accounts,
        [action.username]: {
          ...state.accounts[action.username],
          unreadEmails: action.unreadEmails,
        },
      },
    };
  }

  return state;
};
