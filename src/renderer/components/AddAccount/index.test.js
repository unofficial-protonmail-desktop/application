import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import AddAccount from './';

describe('components/AddAccount', () => {
  it('should update the state upon input change', () => {
    const username = 'alibaba';
    const context = shallow(<AddAccount onSubmit={sinon.spy()} />);

    context.find('input').simulate('change', { target: { value: username } });

    expect(context.state('username')).to.equal(username);
  });

  it('should call onSubmit upon submitting form', () => {
    const onSubmit = sinon.spy();
    const context = shallow(<AddAccount onSubmit={onSubmit} />);

    context.find('form').simulate('submit', {
      preventDefault: sinon.spy(),
    });

    expect(onSubmit).to.have.been.called;
  });
});
