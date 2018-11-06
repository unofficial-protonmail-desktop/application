import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Redirect } from 'react-router-dom';
import App from './';

describe('components/App', () => {
  const defaultProps = {
    onMount: () => null,
  };

  it('should fire onMount upon mount', () => {
    const onMount = sinon.spy();
    shallow(<App {...defaultProps} onMount={onMount} />);

    expect(onMount).to.have.been.calledWith();
  });

  it('should redirect to /add-account when firstAccount is falsy', () => {
    const wrapper = shallow(<App {...defaultProps} firstAccount={undefined} />);

    expect(wrapper.find(Redirect).length).to.equal(1);
    expect(wrapper.find(Redirect).props()).to.contain({
      from: '/',
      to: '/add-account',
    });
  });

  it('should redirect to first account when firstAccount is truthy', () => {
    const firstAccount = { username: 'otto' };
    const wrapper = shallow(<App {...defaultProps} firstAccount={firstAccount} />);

    expect(wrapper.find(Redirect).length).to.equal(1);
    expect(wrapper.find(Redirect).props()).to.contain({
      from: '/',
      to: `/mailbox/${firstAccount.username}`
    });
  });
});
