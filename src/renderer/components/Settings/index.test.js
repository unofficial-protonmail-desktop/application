import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Settings from './';

describe('components/Settings', () => {
  it('should display a checkbox for dark theme', () => {
    const context = shallow(<Settings
      darkTheme={true}
      onChangeSetting={sinon.spy()}
    />);

    expect(context.find('input[name="darkTheme"]').length).to.equal(1);
  });

  it('should call onUpdateSetting upon changing a setting', () => {
    const onChangeSetting = sinon.spy();
    const context = shallow(<Settings
      darkTheme={true}
      onChangeSetting={onChangeSetting}
    />);

    context.find('input').forEach(input => {
      const event = {
        target: {
          name: input.prop('name'),
          checked: true,
        },
      };
      input.simulate('change', event);

      expect(onChangeSetting).to.have.been.called;
    });
  });
});
