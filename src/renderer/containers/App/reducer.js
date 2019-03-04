import { RELOAD_WEBVIEW, WEBVIEW_ERROR } from '../../middlewares/Webviews/types';
import { ADD_ACCOUNT, REMOVE_ACCOUNT, TOGGLE_SIDEBAR, TOGGLE_SIDEBAR_ITEM_POSITION, UPDATE_SETTINGS, UPDATE_UNREAD_EMAILS } from './types';

const initialState = {
  accounts: [],
  settings: {
    darkTheme: false,
    hideSidebar: false,
    useProtonMailBeta: false,
  },
  webviewStatuses: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ADD_ACCOUNT:
    return {
      ...state,
      accounts: [
        ...state.accounts,
        action.account,
      ],
    };
  case REMOVE_ACCOUNT:
    return {
      ...state,
      accounts: state.accounts.filter(a => a.username !== action.username),
    };
  case TOGGLE_SIDEBAR:
    return {
      ...state,
      settings: {
        ...state.settings,
        hideSidebar: !state.settings.hideSidebar,
      }
    };

  case TOGGLE_SIDEBAR_ITEM_POSITION: {
    const accounts = [...state.accounts];
    accounts.splice(action.to, 0, ...accounts.splice(action.from, 1));

    return {
      ...state,
      accounts
    };
  }

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
      accounts: state.accounts
        .map(a => a.username === action.username ? ({ ...a, unreadEmails: action.unreadEmails }) : a)
    };
  }

  return state;
};
