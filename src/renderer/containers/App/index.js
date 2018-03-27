import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';

import webviewHandler from '../../lib/webview-handler';
import AppState from './reducer';
import AddAccount from '../AddAccount';
import Wrapper from '../../components/Wrapper';
import Sidebar from '../Sidebar';
import Settings from '../Settings';
import MailBox from '../MailBox';

import WebviewsMw from '../../middlewares/Webviews';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  AppState, 
  composeEnhancers(applyMiddleware(WebviewsMw, thunk)),
);

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
