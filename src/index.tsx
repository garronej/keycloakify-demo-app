import { useEffect } from "react";
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  KcApp as KcAppBase,
  defaultKcProps,
  getKcContext,
  kcMessages,
  useKcLanguageTag
} from "keycloakify";
import { css } from "tss-react";
import tos_en_url from "./tos_en.md";
import tos_fr_url from "./tos_fr.md";

const { kcContext } = getKcContext({
  /* Uncomment to test the login page for development */
  //"mockPageId": "login.ftl"
});

if (kcContext !== undefined) {
  console.log(kcContext);
}

ReactDOM.render(
  kcContext === undefined ?
    <App /> :
    <KcApp />,
  document.getElementById("root")
);

function KcApp() {

  if (kcContext === undefined) {
    throw new Error();
  }

  const { kcLanguageTag } = useKcLanguageTag();

  //Lazily download the therms and conditions in the appropriate language
  //if we are on the terms.ftl page.
  useEffect(
    () => {

      if (kcContext!.pageId !== "terms.ftl") {
        return;
      }

      kcMessages[kcLanguageTag].termsTitle = "";

      fetch((() => {
        switch (kcLanguageTag) {
          case "fr": return tos_fr_url;
          default: return tos_en_url;
        }
      })())
        .then(response => response.text())
        .then(rawMarkdown => kcMessages[kcLanguageTag].termsText = rawMarkdown);

    },
    [kcLanguageTag]
  );

  return (
      <KcAppBase
        kcContext={kcContext}
        {...{
          ...defaultKcProps,
          "kcHeaderWrapperClass": css({ "color": "red", "fontFamily": '"Work Sans"' })
        }}
      />
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
