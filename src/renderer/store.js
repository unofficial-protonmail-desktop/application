import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AppState from './containers/App/reducer';
import WebviewsMw from './middlewares/Webviews';
import PersistMw from './middlewares/StatePersist';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let initialState;

try {
  initialState = JSON.parse(window.localStorage.getItem('appState'));
} catch (error) {
  initialState = {};
}

export default createStore(
  AppState, 
  initialState,
  composeEnhancers(applyMiddleware(WebviewsMw, PersistMw, thunk)),
);
