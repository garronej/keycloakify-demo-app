import { memo } from "react";
import { useDownloadTerms, kcMessages } from "keycloakify";
import type { KcProps } from "keycloakify";
import type { KcContext } from "../kcContext";
import { Terms as TermsBase } from "keycloakify/lib/components/Terms";
import tos_en_url from "./tos_en.md";
import tos_fr_url from "./tos_fr.md";

type KcContext_Terms = Extract<KcContext, { pageId: "terms.ftl"; }>;

export const Terms = memo(({ kcContext, ...props }: { kcContext: KcContext_Terms; } & KcProps) => {

    useDownloadTerms({
        kcContext,
        "downloadTermMarkdown": async ({ currentKcLanguageTag })=> {

            kcMessages[currentKcLanguageTag].termsTitle = "";

            const markdownString=await  fetch((() => {
                switch (currentKcLanguageTag) {
                    case "fr": return tos_fr_url;
                    default: return tos_en_url;
                }
            })())
                .then(response => response.text());

            return markdownString;

        }
    });

    return <TermsBase {...{ kcContext, ...props }} />;

});
