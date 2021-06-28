import { memo } from "react";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";

type KcContext_MyExtraPage2 = Extract<KcContext, { pageId: "my-extra-page-2.ftl"; }>;

export const MyExtraPage2 = memo(({ kcContext, ...props }: { kcContext: KcContext_MyExtraPage2; } & KcProps) => {

    console.log(`TODO: Do something with: ${kcContext.someCustomValue}`);

    return <>It is up to you to implement this page</>

});
