import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import { TOGGLE_SIDEBAR_ITEM_POSITION } from './App/types';
import SidebarContainer from './Sidebar';

describe('containers/Sidebar', () => {
  const defaultProps = {
    location: {}
  };
  let store;

  beforeEach(() => {
    store = {
      dispatch: sinon.spy(),
      getState: () => ({
        accounts: [],
        settings: {
          hideSidebar: false
        }
      }),
      subscribe: () => null
    };
  });

  it('should dispatch TOGGLE_SIDEBAR_ITEM_POSITION upon onChangePosition', () => {
    const wrapper = shallow(<SidebarContainer {...defaultProps} store={store} />);

    const from = 12;
    const to = 15;
    wrapper.dive().props().onChangePosition({ from, to });

    expect(store.dispatch).to.have.been.calledWith({
      type: TOGGLE_SIDEBAR_ITEM_POSITION,
      from,
      to
    });
  });
});
