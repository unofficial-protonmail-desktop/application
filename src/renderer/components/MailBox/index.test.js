import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import MailBox from './';

describe('components/MailBox', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      darkTheme: false,
      displayWebview: sinon.spy(),
      hideWebviews: sinon.spy(),
      onReload: sinon.spy(),
      reloadWebview: sinon.spy(),
      useProtonMailBeta: false,
      username: 'jan.banan',
    };
  });

  it('should call prop displayWebview upon mount if error is falsy', () => {
    const darkTheme = true;
    const displayWebview = sinon.spy();
    const useProtonMailBeta = true;
    shallow(<MailBox
      {...defaultProps}
      darkTheme={darkTheme}
      displayWebview={displayWebview}
      useProtonMailBeta={useProtonMailBeta}
    />);

    expect(displayWebview).to.have.been.calledWith({
      darkTheme,
      useBeta: useProtonMailBeta,
    });
  });

  it('should display view with updated username', () => {
    const displayWebview = sinon.spy();
    const darkTheme = false;
    const useProtonMailBeta = true;
    const context = shallow(<MailBox
      {...defaultProps}
      darkTheme={darkTheme}
      username="jan"
      displayWebview={displayWebview}
      useProtonMailBeta={useProtonMailBeta}
    />);
    displayWebview.resetHistory();
    const username = 'albert';

    context.setProps({ username });

    expect(displayWebview).to.have.been.calledWith({
      darkTheme,
      useBeta: useProtonMailBeta,
    });

    context.setProps({ username });

    expect(displayWebview).to.have.been.calledOnce;
  });

  it('should call prop hideViews upon mount', () => {
    const hideWebviews = sinon.spy();
    const context = shallow(<MailBox
      {...defaultProps}
      username="alfred"
      hideWebviews={hideWebviews}
    />);
    expect(hideWebviews).not.to.have.been.called;

    context.unmount();
    expect(hideWebviews).to.have.been.called;
  });

  it('should display a message when there\'s an error', () => {
    const error = { errorDescription: 'The page could not be loaded' };
    const onReload = sinon.spy();
    const username = 'astrid';
    const context = shallow(<MailBox
      {...defaultProps}
      error={error}
      onReload={onReload}
      username={username}
    />);

    expect(context.text()).to.contain(error.errorDescription);
    expect(context.find('button').text()).to.contain('Reload');

    context.find('button').simulate('click');
    expect(onReload).to.have.been.calledWith(username);
  });

  it('should hide the webviews when an error has arrived', () => {
    const displayWebview = sinon.spy();
    const hideWebviews = sinon.spy();
    const context = shallow(<MailBox
      {...defaultProps}
      {...{ displayWebview, hideWebviews }}
    />);
    displayWebview.resetHistory();

    context.setProps({ error: { errorDescription: 'bad' } });

    expect(displayWebview).to.not.have.been.called;
    expect(hideWebviews).to.have.been.calledWith();
  });

  it('should display webview when the error has disappeared', () => {
    const username = 'rudolf';
    const displayWebview = sinon.spy();
    const darkTheme = true;
    const useProtonMailBeta = false;
    const context = shallow(<MailBox
      {...defaultProps}
      darkTheme={darkTheme}
      displayWebview={displayWebview}
      error={{ message: '' }}
      useProtonMailBeta={useProtonMailBeta}
      username={username}
    />);

    displayWebview.resetHistory();

    context.setProps({ error: null });

    expect(displayWebview).to.have.been.calledWith({
      darkTheme,
      useBeta: useProtonMailBeta,
    });
  });
});
