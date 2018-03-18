import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppState from './reducer';

import Sidebar from '../Sidebar';

const store = createStore(AppState);

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Sidebar />
        <h1>Hej</h1>
        <webview
          src="https://mail.protonmail.com/"
        />
      </div>
    </Provider>
  );
}
