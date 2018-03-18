import { ADD_ACCOUNT, REMOVE_ACCOUNT } from './types';

const initialState = {
  accounts: {}
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
  }

  return state;
};
