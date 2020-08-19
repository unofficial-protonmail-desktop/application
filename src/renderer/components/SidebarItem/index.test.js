import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { remote } from 'electron';
import ConnectedSidebarItem, { SidebarItem } from './';

describe('components/SidebarItem', () => {
  const defaultProps = {
    href: '',
    isActive: false,
    onOpenMenu: () => null,
    onRemoveAccount: () => null,
    onReloadAccount: () => null,
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

describe('components/ConnectedSidebarItem', () => {
  const defaultProps = {
    isActive: true,
    href: '',
    onRemoveAccount: () => null,
    onReloadAccount: () => null,
    username: '',
  };
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.stub(remote.Menu, 'buildFromTemplate');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create remote Menu', () => {
    shallow(<ConnectedSidebarItem {...defaultProps} />);

    expect(remote.Menu.buildFromTemplate).to.have.been.calledOnce;
  });

  it('should open remote Menu upon SidebarItem onOpenMenu', () => {
    const menu = {
      popup: sinon.spy(),
    };
    remote.Menu.buildFromTemplate.returns(menu);
    const wrapper = shallow(<ConnectedSidebarItem {...defaultProps} />);

    wrapper.find(SidebarItem).props().onOpenMenu();
    expect(menu.popup).to.have.been.calledOnce;
  });

  it('should call onRemoveAccount upon remove account', () => {
    const onRemoveAccount = sinon.spy();
    const username = 'användare1';
    shallow(<ConnectedSidebarItem {...defaultProps} onRemoveAccount={onRemoveAccount} username={username} />);

    remote.Menu.buildFromTemplate.lastCall.args[0].find(item => item.label.toLowerCase().match(/remove/)).click();

    expect(onRemoveAccount).to.have.been.calledWith(username);
  });

  it('should call onReloadAccount upon reload click', () => {
    const onReloadAccount = sinon.spy();
    const username = 'användare2';
    shallow(<ConnectedSidebarItem {...defaultProps} onReloadAccount={onReloadAccount} username={username} />);

    remote.Menu.buildFromTemplate.lastCall.args[0].find(item => item.label.toLowerCase().match(/reload/)).click();

    expect(onReloadAccount).to.have.been.calledWith(username);
  });
});
