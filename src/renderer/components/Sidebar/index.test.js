import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Sidebar from './';

describe('components/Sidebar', () => {
  it('should display an accurate add account button', () => {
    const context = shallow(<Sidebar
      accounts={[]}
      location={{}}
    />);

    expect(context.find('Link[to="/add-account"]').length).to.equal(1);
  });

  it('should list all accounts', () => {
    const accounts = [
      { username: 'matthew' },
      { username: 'viking' },
      { username: 'rod.stewart' },
    ];
    const context = shallow(<Sidebar
      accounts={accounts}
      location={{}}
    />);

    accounts
      .forEach(({ username }) => {
        expect(context.find(`Link[to="/mailbox/${username}"]`).length).to.equal(1);
      });
  });

  it('should display a notifications badge when unreadEmails is given', () => {
    const unreadEmails = 12;
    const accounts = [
      { username: 'karin' },
      { username: 'lisa', unreadEmails },
    ];
    const context = shallow(<Sidebar
      accounts={accounts}
      location={{}}
    />);

    expect(context.find('span.NotificationBadge').length).to.equal(1);
    expect(context.find('span.NotificationBadge').text()).to.equal(unreadEmails.toString());
  });

  it('should display a settings button', () => {
    const context = shallow(<Sidebar
      accounts={[]}
      location={{}}
    />);

    expect(context.find('Link[to="/settings"]').length).to.equal(1);
  });
});
