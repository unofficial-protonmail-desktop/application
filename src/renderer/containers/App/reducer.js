import { ADD_ACCOUNT, REMOVE_ACCOUNT, UPDATE_SETTINGS } from './types';

const initialState = {
  accounts: {},
  settings: {
    darkTheme: false,
  },
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
  }

  return state;
};
