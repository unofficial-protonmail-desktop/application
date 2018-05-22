import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import store from './store';
import App from './containers/App';

import './styles/base.scss';

let AppComponent;

if (module.hot) {
  AppComponent = hot(module)(App);
} else {
  AppComponent = App;
}

ReactDOM.render(
  <Provider store={store}>
    <AppComponent />
  </Provider>,
  document.getElementById('root')
);
