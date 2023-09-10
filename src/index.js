
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your main application component

import { AppProvider } from "./hooks/contextAPI"

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
      </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
