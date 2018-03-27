import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

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
    />);

    accounts
      .forEach((username) => {
        expect(context.find(`Link[to="/mailbox/${username}"]`).length).to.equal(1);
      });
  });

  it('should display a settings button', () => {
    const context = shallow(<Sidebar
      accounts={[]}
    />);

    expect(context.find('Link[to="/settings"]').length).to.equal(1);
  });
});