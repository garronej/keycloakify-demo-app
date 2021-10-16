import { useEffect } from "react";
import { render } from "react-dom";
import "./index.scss";
import { App } from "./App";
import {
  KcApp as KcAppBase,
  defaultKcProps,
  getKcContext,
  kcMessages,
  useKcLanguageTag
} from "keycloakify";
import { useCssAndCx } from "tss-react";
import tos_en_url from "./tos_en.md";
import tos_fr_url from "./tos_fr.md";
import "./kcMessagesExtension"

const { kcContext } = getKcContext({
  /* Uncomment to test th<e login page for development */
  //"mockPageId": "login.ftl"
});

if (kcContext !== undefined) {
  console.log(kcContext);
}

render(
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

  const { css } = useCssAndCx();

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
