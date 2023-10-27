import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import {
  getRoleId,
  getToken,
  getTokenExpiry,
  getUser,
} from "./utilities/Common.js";

//GLOBAL VARIABLES
// window.$link= "https://blue.qrdiagnosticsph.com/";
window.$link = "https://blue.qrdiagnosticsph.com/";
// window.$link = "https://blue.qrdiagnosticsph.com/";
// blue-dev.qrdiagnosticsph.com/
// https://blue.qrdiagnosticsph.com/"
window.$api_key = "84366d00-3deb-4066-abca-3fb7adf80166";
// window.$api_key = "Y5QubbhTOb";
window.$userId = getUser();
window.$roleId = getRoleId();
window.$userToken = getToken();
window.$token_expiry = getTokenExpiry();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
