import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import App from './containers/App';

import './styles/base.scss';

let AppComponent;

if (module.hot) {
  AppComponent = hot(module)(App);
} else {
  AppComponent = App;
}

ReactDOM.render(
  <AppComponent />,
  document.getElementById('root')
);
