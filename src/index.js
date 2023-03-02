import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {getRoleId, getToken, getTokenExpiry, getUser} from './utilities/Common.js';



//GLOBAL VARIABLES
window.$link= "https://blue-dev.qrdiagnosticsph.com/";
// blue-dev.qrdiagnosticsph.com/
// https://blue.qrdiagnosticsph.com/"
window.$api_key = "Y5QubbhTOb";
window.$userToken = getToken();
window.$userId = getUser();
window.$roleId = getRoleId();
window.$token_expiry = getTokenExpiry();

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
