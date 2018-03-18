import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppState from './reducer';
import AddAccount from '../AddAccount';
import Wrapper from '../../components/Wrapper';
import Sidebar from '../Sidebar';
import Settings from '../Settings';

const store = createStore(AppState);

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Wrapper>
          <Sidebar />

          <Route path="/settings" component={Settings} />
          <Route path="/add-account" component={AddAccount} />
        </Wrapper>
      </Router>
    </Provider>
  );
}
