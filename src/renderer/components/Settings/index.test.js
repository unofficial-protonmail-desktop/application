import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Settings from './';

describe('components/Settings', () => {
  const defaultProps = {
    darkTheme: false,
    onChangeSetting: () => null,
    useProtonMailBeta: false,
  };

  it('should call onChangeSetting upon toggling checkbox for dark theme', () => {
    const onChangeSetting = sinon.spy();
    const wrapper = shallow(<Settings {...defaultProps} onChangeSetting={onChangeSetting} />);

    const name = 'darkTheme';
    const checked = true;
    const event = { target: { name, checked } };
    wrapper.find(`input[name="${name}"]`).simulate('change', event);

    expect(onChangeSetting).to.have.been.calledWith(name, checked);
  });

  it('should call onChangeSetting upon toggling checkbox for useProtonMailBeta', () => {
    const onChangeSetting = sinon.spy();
    const wrapper = shallow(<Settings {...defaultProps} onChangeSetting={onChangeSetting} />);

    const name = 'useProtonMailBeta';
    const checked = 'whatever';
    const event = { target: { name, checked } };
    wrapper.find({ name }).simulate('change', event);

    expect(onChangeSetting).to.have.been.calledWith(name, checked);
  });
});
