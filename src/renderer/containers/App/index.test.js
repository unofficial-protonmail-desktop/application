import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import App from './';

describe('containers/App', () => {
  const defaultState = { accounts: {} };
  const store = {
    dispatch: () => null,
    getState: sinon.stub(),
    subscribe: () => null,
  };
  const defaultProps = {
    store
  };

  afterEach(() => {
    store.getState.returns(defaultState);
  });

  describe('mapStateToProps', () => {
    it('should map value in accounts to firstAccount', () => {
      const firstAccount = { username: 'karl' };
      const accounts = [firstAccount, { username: 'wrong' }];
      store.getState.returns({ accounts });
      const wrapper = shallow(<App {...defaultProps} />);

      expect(wrapper.dive().props().firstAccount).to.eql(firstAccount);
    });
  });
});
