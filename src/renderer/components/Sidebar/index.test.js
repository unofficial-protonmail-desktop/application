import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Sidebar from './';

describe('components/Sidebar', () => {
  const defaultProps = {
    accounts: [],
    isHidden: false,
    location: {},
    onChangePosition: () => null,
    onRemoveAccount: () => null
  };

  it('should display an accurate add account button', () => {
    const context = shallow(<Sidebar {...defaultProps} />);

    expect(context.find('Link[to="/add-account"]').length).to.equal(1);
  });

  it('should list all accounts', () => {
    const accounts = [
      { username: 'matthew', unreadEmails: 12 },
      { username: 'viking', unreadEmails: 112 },
      { username: 'rod.stewart', unreadEmails: 3 },
    ];
    const onRemoveAccount = () => null;
    const context = shallow(<Sidebar {...defaultProps} accounts={accounts} onRemoveAccount={onRemoveAccount} />);
    const listWrapper = shallow(context.find(Droppable).props().children({}));

    accounts
      .forEach(({ username }, index) => {
        const itemWrapper = shallow(listWrapper.find({ draggableId: username }).props().children({}));
        const node = itemWrapper.find(`[href="/mailbox/${username}"]`);

        expect(node.prop('username')).to.equal(accounts[index].username);
        expect(node.prop('unreadEmails')).to.equal(accounts[index].unreadEmails);
        expect(node.prop('onRemoveAccount')).to.equal(onRemoveAccount);
      });
  });

  it('should fire onChangePosition upon DragDropContext onDragEnd', () => {
    const onChangePosition = sinon.spy();
    const wrapper = shallow(<Sidebar {...defaultProps} onChangePosition={onChangePosition} />);

    const from = 4;
    const to = 12;
    wrapper.find(DragDropContext).simulate('dragEnd', {
      destination: { index: to },
      source: { index: from }
    });

    expect(onChangePosition).to.have.been.calledWith({ from, to });
  });

  it('should display a settings button', () => {
    const context = shallow(<Sidebar {...defaultProps} />);

    expect(context.find('Link[to="/settings"]').length).to.equal(1);
  });
});
