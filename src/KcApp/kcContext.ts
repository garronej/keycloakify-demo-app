
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
	/* Uncomment to test outside of keycloak, ⚠️ don't forget to run 'yarn keycloak' at least once */
	//"mockPageId": "register-user-profile.ftl",
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
		},
		{
			//NOTE: You will either use register.ftl or register-user-profile.ftl, not both, more info in Keycloakify's README
			"pageId": "register-user-profile.ftl",
			"locale": {
				"currentLanguageTag": "fr"
			},
			"profile": {
				"attributes": [
					{
						"validators": {
							"pattern": {
								"pattern": "^[a-zA-Z0-9]+$",
								"ignore.empty.value": true,
								// eslint-disable-next-line no-template-curly-in-string
								"error-message": "${alphanumericalCharsOnly}",
							},
						},
						//NOTE: To override the default mock value
						"value": undefined,
						"name": "username",
					},
					{
						"validators": {
							"options": {
								"options": ["male", "female", "non-binary", "transgender", "intersex", "non_communicated"]
							}
						},
						// eslint-disable-next-line no-template-curly-in-string
						"displayName": "${gender}",
						"annotations": {},
						"required": true,
						"groupAnnotations": {},
						"readOnly": false,
						"name": "gender",
					}
				],
			},
		},

	]
});

export type KcContext = NonNullable<typeof kcContext>;