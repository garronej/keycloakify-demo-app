import { useEffect, memo } from "react";
import { useKcLanguageTag, kcMessages } from "keycloakify";
import type { KcProps } from "keycloakify";
import type { KcContext } from "../kcContext";
import { Terms as TermsBase } from "keycloakify/lib/components/Terms";
import tos_en_url from "./tos_en.md";
import tos_fr_url from "./tos_fr.md";

type KcContext_Terms = Extract<KcContext, { pageId: "terms.ftl"; }>;

export const Terms = memo(({ kcContext, ...props }: { kcContext: KcContext_Terms; } & KcProps) => {

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [kcLanguageTag]
    );

    return <TermsBase {...{ kcContext, ...props }} />;

});
