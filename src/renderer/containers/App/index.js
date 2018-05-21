import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';

import webviewHandler from '../../lib/webview-handler';
import history from '../../history';
import AppState from './reducer';
import AddAccount from '../AddAccount';
import Wrapper from '../../components/Wrapper';
import Sidebar from '../Sidebar';
import Settings from '../Settings';
import MailBox from '../MailBox';

import WebviewsMw from '../../middlewares/Webviews';
import PersistMw from '../../middlewares/StatePersist';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let initialState;

try {
  initialState = JSON.parse(window.localStorage.getItem('appState'));
} catch (error) {
  initialState = {};
}

const store = createStore(
  AppState, 
  initialState,
  composeEnhancers(applyMiddleware(WebviewsMw, PersistMw, thunk)),
);

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
