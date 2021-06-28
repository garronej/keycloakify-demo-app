import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { kcContext } from "./KcApp/kcContext";
import { KcApp } from "./KcApp";

ReactDOM.render(
  kcContext === undefined ?
    <App /> :
    <KcApp kcContext={kcContext} />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
