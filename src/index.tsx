import { useEffect } from "react";
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  KcApp,
  defaultKcProps,
  kcContext as realKcContext,
  kcContextMocks,
  kcMessages,
  useKcLanguageTag
} from "keycloakify";
import { css } from "tss-react";
import tos_en_url from "./tos_en.md";
import tos_fr_url from "./tos_fr.md";

const kcContext = realKcContext ?? (
  false /* Set to true to test the login pages outside of Keycloak */
    ? kcContextMocks.kcLoginContext /* Change to .kcRegisterContext for example */
    :
    undefined
);

if (kcContext !== undefined) {
  console.log(kcContext);
}

ReactDOM.render(
  kcContext === undefined ?
    <App /> :
    <Login />,
  document.getElementById("root")
);

function Login() {

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
    <>
      <div id="foobar" style={{ "width": "200px", "height": "200px" }}></div>
      <h1 style={{ "fontFamily": '"Work Sans"' }}>Test that the font apply</h1>
      <KcApp
        kcContext={kcContext}
        {...{
          ...defaultKcProps,
          "kcHeaderWrapperClass": css({ "color": "red", "fontFamily": '"Work Sans"' })
        }}
      />
    </>

  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
