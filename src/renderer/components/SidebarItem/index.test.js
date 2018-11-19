import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { SidebarItem } from './';

describe('components/SidebarItem', () => {
  const defaultProps = {
    href: '',
    isActive: false,
    onOpenMenu: () => null,
    onRemoveAccount: () => null,
    username: '',
  };

  it('should display a notifications badge when unreadEmails is given', () => {
    const unreadEmails = 12;
    const wrapper = shallow(<SidebarItem
      {...defaultProps}
      unreadEmails={unreadEmails}
    />);

    expect(wrapper.find('span.NotificationBadge').length).to.equal(1);
    expect(wrapper.find('span.NotificationBadge').text()).to.equal(unreadEmails.toString());
  });

  it('should not display a notification badge when unreadEmails is 0', () => {
    const wrapper = shallow(<SidebarItem {...defaultProps} unreadEmails={0} />);

    expect(wrapper.find('span.NotificationBadge').length).to.equal(0);
  });
});
