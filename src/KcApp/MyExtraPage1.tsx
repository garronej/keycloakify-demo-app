import { memo } from "react";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";

type KcContext_MyExtraPage1 = Extract<KcContext, { pageId: "my-extra-page-1.ftl"; }>;

export const MyExtraPage1 = memo(({ kcContext, ...props }: { kcContext: KcContext_MyExtraPage1; } & KcProps) => {

    return <>It is up to you to implement this page</>

});
