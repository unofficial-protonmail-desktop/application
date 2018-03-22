import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import MailBox from './';

describe('components/MailBox', () => {
  const mockWebviewHandler = {
    show: sinon.spy(),
    displayView: sinon.spy(),
    hide: sinon.spy(),
  };

  it('should show webviewHandler upon mount', () => {
    const username = 'jan';
    shallow(<MailBox
      username={username}
      webviewHandler={mockWebviewHandler}
    />);

    expect(mockWebviewHandler.show).to.have.been.calledWith();
    expect(mockWebviewHandler.displayView).to.have.been.calledWith(username);
  });

  it('should display view with updated username', () => {
    const context = shallow(<MailBox
      username="jan"
      webviewHandler={mockWebviewHandler}
    />);
    const username = 'albert';
    mockWebviewHandler.displayView.resetHistory();

    context.setProps({ username });

    expect(mockWebviewHandler.displayView).to.have.been.calledWith(username);

    context.setProps({ username });

    expect(mockWebviewHandler.displayView).to.have.been.calledOnce;
  });

  it('should hide webviewHandler upon unmount', () => {
    const context = shallow(<MailBox
      username="alfred"
      webviewHandler={mockWebviewHandler}
    />);
    expect(mockWebviewHandler.hide).not.to.have.been.called;
 
    context.unmount();
    expect(mockWebviewHandler.hide).to.have.been.called;
  });
});
