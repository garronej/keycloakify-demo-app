import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  KcApp,
  defaultKcProps,
  kcContext as realKcContext,
  kcContextMocks
} from "keycloakify";
import { css } from "tss-react";

const kcContext = realKcContext ?? (
  false /* Set to true to test the login pages outside of Keycloak */
    ? kcContextMocks.kcLoginContext /* Change to .kcRegisterContext for example */
    :
    undefined
);

console.log(kcContext);

ReactDOM.render(
  kcContext !== undefined ?
    <KcApp
      kcContext={kcContext}
      {...{
        ...defaultKcProps,
        "kcHeaderWrapperClass": css({ "color": "red" })
      }}
    /> :
    <App />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
