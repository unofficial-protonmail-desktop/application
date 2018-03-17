import React from 'react';

import Sidebar from '../components/Sidebar';

export default function App() {
  return (
    <div>
      <Sidebar />
      <h1>Hej</h1>
      <webview
        src="https://mail.protonmail.com/"
      />
    </div>
  );
}
