import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AppState from './containers/App/reducer';
import WebviewsMw from './middlewares/Webviews';
import PersistMw from './middlewares/StatePersist';
import forwardIpcToStore from './forward-ipc-to-store';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let initialState;

try {
  initialState = JSON.parse(window.localStorage.getItem('appState')) || undefined;

  if (initialState && 'accounts' in initialState && !Array.isArray(initialState.accounts)) {
    initialState.accounts = Object.values(initialState.accounts);
  }
} catch (error) {
  initialState = undefined;
}

const store = createStore(
  AppState, 
  initialState,
  composeEnhancers(applyMiddleware(WebviewsMw, PersistMw, thunk)),
);

forwardIpcToStore(store);

export default store;
