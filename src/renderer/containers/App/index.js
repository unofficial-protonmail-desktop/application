import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import webviewHandler from '../../lib/webview-handler';
import history from '../../history';
import store from '../../store';
import AddAccount from '../AddAccount';
import Wrapper from '../../components/Wrapper';
import Sidebar from '../Sidebar';
import Settings from '../Settings';
import MailBox from '../MailBox';

export default class App extends React.Component {
  state = {
    webviewReady: false,
  };

  setWebviewContainerElem(elem) {
    if (webviewHandler.container) return;
    webviewHandler.attachTo(elem);

    this.setState({
      webviewReady: true,
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Wrapper>
            <Sidebar />

            <Route path="/settings" component={Settings} />
            <Route path="/add-account" component={AddAccount} />
            <Route
              path="/mailbox/:username"
              render={props => this.state.webviewReady && <MailBox
                webviewHandler={webviewHandler}
                {...props.match.params}
              />}
            />
            <div ref={this.setWebviewContainerElem.bind(this)} />
          </Wrapper>
        </Router>
      </Provider>
    );
  }
}
