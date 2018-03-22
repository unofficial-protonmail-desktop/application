import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import webviewHandler from '../../lib/webview-handler';
import AppState from './reducer';
import AddAccount from '../AddAccount';
import Wrapper from '../../components/Wrapper';
import Sidebar from '../Sidebar';
import Settings from '../Settings';
import MailBox from '../MailBox';

const store = createStore(AppState);

export default class App extends React.Component {
  setWebviewContainerElem(elem) {
    if (webviewHandler.container) return;
    webviewHandler.attachTo(elem);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Wrapper>
            <Sidebar />

            <Route path="/settings" component={Settings} />
            <Route path="/add-account" component={AddAccount} />
            <Route
              path="/mailbox/:username"
              render={props => <MailBox
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
