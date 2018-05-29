import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Sidebar from './';

describe('components/Sidebar', () => {
  it('should display an accurate add account button', () => {
    const context = shallow(<Sidebar
      accounts={[]}
      location={{}}
      onRemoveAccount={() => null}
    />);

    expect(context.find('Link[to="/add-account"]').length).to.equal(1);
  });

  it('should list all accounts', () => {
    const accounts = [
      { username: 'matthew', unreadEmails: 12 },
      { username: 'viking', unreadEmails: 112 },
      { username: 'rod.stewart', unreadEmails: 3 },
    ];
    const onRemoveAccount = () => null;
    const context = shallow(<Sidebar
      accounts={accounts}
      location={{}}
      onRemoveAccount={onRemoveAccount}
    />);

    accounts
      .forEach(({ username }, index) => {
        const node = context.find(`[href="/mailbox/${username}"]`);

        expect(node.prop('username')).to.equal(accounts[index].username);
        expect(node.prop('unreadEmails')).to.equal(accounts[index].unreadEmails);
        expect(node.prop('onRemoveAccount')).to.equal(onRemoveAccount);
      });
  });

  it('should display a settings button', () => {
    const context = shallow(<Sidebar
      accounts={[]}
      location={{}}
      onRemoveAccount={() => null}
    />);

    expect(context.find('Link[to="/settings"]').length).to.equal(1);
  });
});
