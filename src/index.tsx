import "./index.scss";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { App } from "./App";
import {
  KcApp as KcAppBase,
  defaultKcProps,
  getKcContext,
  kcMessages,
  useDownloadTerms
} from "keycloakify";
import { useCssAndCx } from "tss-react";
import tos_en_url from "./tos_en.md";
import tos_fr_url from "./tos_fr.md";
import "./kcMessagesExtension"

const { kcContext } = getKcContext({
  /* Uncomment to test th<e login page for development */
  //"mockPageId": "login.ftl",
  "mockData": [
    {
      "pageId": "login.ftl",
      "locale": {
        "currentLanguageTag": "fr" //When we test the login page we do it in french
      }
    }
  ]
});

if (kcContext !== undefined) {
  console.log(kcContext);
}

function KcApp() {

  if (kcContext === undefined) {
    throw new Error();
  }

  useDownloadTerms({
    kcContext,
    "downloadTermMarkdown": async ({ currentKcLanguageTag }) => {

      kcMessages[currentKcLanguageTag].termsTitle = "";

      const markdownString = await fetch((() => {
        switch (currentKcLanguageTag) {
          case "fr": return tos_fr_url;
          default: return tos_en_url;
        }
      })())
        .then(response => response.text());

      return markdownString;

    }
  });

  const { css } = useCssAndCx();

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


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {
      kcContext === undefined ?
        <App /> :
        <KcApp />
    }
  </StrictMode>
);
