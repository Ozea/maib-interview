import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { makeServer } from './utils/miragejs.config';

if (process.env.REACT_APP_MOCK_ENABLED === 'true') {
  makeServer();
} else {
  console.log('Application is not in DEV mode. To turn on mock api calls update "REACT_APP_MOCK_ENABLED" value to "true" in .env file');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
