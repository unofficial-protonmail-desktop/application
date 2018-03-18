import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Sidebar from './';

describe('components/Sidebar', () => {
  it('should display an accurate add account button', () => {
    const context = shallow(<Sidebar
      accounts={[]}
    />);

    expect(context.find('Link[to="/add-account"]').length).to.equal(1);
  });

  it('should list all accounts', () => {
    const accounts = [
      'matthew',
      'viking',
      'rod.stewart',
    ];
    const context = shallow(<Sidebar
      accounts={accounts}
      onSelectAccount={sinon.spy()}
    />);

    accounts
      .map(account => account.charAt(0))
      .forEach((a, index) => {
        expect(context.find('button').at(index).text()).to.equal(a);
      });
  });

  it('should trigger onSelectAccount upon clicking on an account', () => {
    const account = 'a.count';
    const onSelectAccount = sinon.spy();
    const context = shallow(<Sidebar
      accounts={[account]}
      onSelectAccount={onSelectAccount}
    />);

    context.find('button').at(0).simulate('click');

    expect(onSelectAccount).to.have.been.calledWith(account);
  });

  it('should display a settings button', () => {
    const context = shallow(<Sidebar
      accounts={[]}
      onSelectAccount={sinon.spy()}
    />);

    expect(context.find('Link[to="/settings"]').length).to.equal(1);
  });
});
