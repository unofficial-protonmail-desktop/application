import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { SidebarItem } from './';

describe('components/SidebarItem', () => {
  it('should display a notifications badge when unreadEmails is given', () => {
    const unreadEmails = 12;
    const context = shallow(<SidebarItem
      href=""
      isActive={false}
      onOpenMenu={() => {}}
      onRemoveAccount={() => {}}
      unreadEmails={unreadEmails}
      username=""
    />);

    expect(context.find('span.NotificationBadge').length).to.equal(1);
    expect(context.find('span.NotificationBadge').text()).to.equal(unreadEmails.toString());
  });

});
