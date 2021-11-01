
import { getKcContext } from "keycloakify";


export const { kcContext } = getKcContext<
	{
		pageId: "register.ftl";
		/** 
		 * Defined when you use the keycloak-mail-whitelisting keycloak plugin
		 * (https://github.com/micedre/keycloak-mail-whitelisting)
		 */
		authorizedMailDomains: string[];
	} |
	//NOTE: A 'keycloakify' field must be added 
	//in the package.json to generate theses pages
	{
		pageId: "my-extra-page-1.ftl";
	} | {
		pageId: "my-extra-page-2.ftl";
		someCustomValue: string;
	}
>({
	/* Uncomment to test */
	//"mockPageId": "login.ftl",
	/** 
	 * Customize the simulated kcContext that will let us 
	 * dev the page outside keycloak (with auto-reload)
	 */
	"mockData": [
		{
			"pageId": "my-extra-page-2.ftl",
			"someCustomValue": "foo bar baz"
		},
		{
			"pageId": "register.ftl",
			"authorizedMailDomains": [
				"example.com",
				"another-example.com",
				"*.yet-another-example.com",
				"*.example.com",
				"hello-world.com"
			]
		}
	]
});

export type KcContext = NonNullable<typeof kcContext>;