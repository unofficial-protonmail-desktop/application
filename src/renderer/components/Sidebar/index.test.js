import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Sidebar from './';

describe('components/Sidebar', () => {
  it('should display an accureate add account button', () => {
    const onAddAccount = sinon.spy();
    const context = shallow(<Sidebar
      onAddAccount={onAddAccount}
      onSelectAccount={onAddAccount}
    />);

    context.find('button').at(0).simulate('click');

    expect(onAddAccount).to.have.been.called;
  });

  it('should list all accounts', () => {
    const accounts = [
      'matthew',
      'viking',
      'rod.stewart',
    ];
    const context = shallow(<Sidebar
      accounts={accounts}
      onAddAccount={sinon.spy()}
      onSelectAccount={sinon.spy()}
    />);

    accounts
      .map(account => account.charAt(0))
      .forEach((a, index) => {
        expect(context.find('button').at(index + 1).text()).to.equal(a);
      });
  });

  it('should trigger onSelectAccount upon clicking on an account', () => {
    const account = 'a.count';
    const onSelectAccount = sinon.spy();
    const context = shallow(<Sidebar
      accounts={[account]}
      onAddAccount={sinon.spy()}
      onSelectAccount={onSelectAccount}
    />);

    context.find('button').at(1).simulate('click');

    expect(onSelectAccount).to.have.been.calledWith(account);
  });
});
