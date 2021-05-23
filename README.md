<p align="center">
    <img src="https://github.com/garronej/keycloakify-demo-app/workflows/ci/badge.svg?branch=main">
</p>

This repo constitutes an easily reusable CI setup for React App in general, and Apps that generates Keycloaks's theme 
using [keycloakify](https://github.com/InseeFrLab/keycloakify) in particular.

By default this setup assumes you want to have single project for your main app and for your Keycloak pages.  
If, however, you want a starting point for a project which only purpose is to be a Keycloak theme [read this](/keycloak-theme-only).

- This CI is configured to both publish on [github-pages](https://github.com/garronej/keycloakify-demo-app/blob/224c43383548635a463fa68e8909c147ac189f0e/.github/workflows/ci.yaml#L172-L187) and on [DockerHub](https://github.com/garronej/keycloakify-demo-app/blob/224c43383548635a463fa68e8909c147ac189f0e/.github/workflows/ci.yaml#L56-L94). In practice you probably want one
or the other but not both. 
- To release **don't create a tag manually**, the CI do it for you. Just update the `package.json`'s version field and push.
- The `.jar` files that bundle the Keycloak theme will be attached as an asset with every GitHub release. [Example](https://github.com/InseeFrLab/keycloakify-demo-app/releases/tag/v0.1.0). The permalink to download the latest version is: `https://github.com/USER/PROJECT/releases/latest/download/keycloak-theme.jar`. 
  For this demo repo it's [here](https://github.com/garronej/keycloakify-demo-app/releases/latest/download/keycloak-theme.jar)
- The CI publishes the app docker image on DockerHub. `<org>/<repo>:main` for each **commit** on `main`, `<org>/<repo>:<feature-branch-name>` for each **pull-request** on `main`
  and when **releasing a new version**: `<org>/<repo>:latest` and `<org>/<repo>:X.Y.Z`
  [See on DockerHub](https://hub.docker.com/r/garronej/keycloakify-demo-app/tags?page=1&ordering=last_updated)
- A [CHANGELOG.md](https://github.com/InseeFrLab/keycloakify-demo-app/blob/main/CHANGELOG.md) will be maintained for you using the commit messages between releases. *If you don't want a specific commit to appear
  in the changelog do something like. `git commit -am "yadi yada (changelog ignore)`.*

![image](https://user-images.githubusercontent.com/6702424/114286938-47aea600-9a63-11eb-936e-17159e8826e8.png)
  
![image](https://user-images.githubusercontent.com/6702424/110708577-2d32a400-81fb-11eb-98ae-499d5746c2f2.png)

If you want an example of an app that put that setup in production checkout onyxia-ui: [the repo](https://github.com/InseeFrLab/onyxia-ui), [the login](https://auth.lab.sspcloud.fr/auth/realms/sspcloud/protocol/openid-connect/auth?client_id=onyxia&redirect_uri=https%3A%2F%2Fonyxia.lab.sspcloud.fr), [the app](https://datalab.sspcloud.fr).  

# Important note about Keycloakify

 This repo is currently configured to build the theme with  [`--external-assets`](https://github.com/InseeFrLab/keycloakify#specify-from-where-the-resources-should-be-downloaded). 
 If your keycloak pages need to stay up even when your app is down you should remove `--external-assets` [here](https://github.com/garronej/keycloakify-demo-app/blob/f87f211c433d1520c9ecf66565c6b88779aa98ed/.github/workflows/ci.yaml#L139).

# DockerHub credentials

To enables the CI to publish on DockerHub on your behalf go to 
repository ``Settings`` tab, then ``Secrets`` you will need to add two new secrets:
- ``DOCKERHUB_TOKEN``, you Dockerhub authorization token.
- ``DOCKERHUB_USERNAME``, Your Dockerhub username.  
# Docker

```bash
docker build -f Dockerfile -t garronej/keycloakify-demo-app:test .
#OR:
yarn && yarn build && tar -cvf build.tar ./build && docker build -f Dockerfile.ci -t garronej/keycloakify-demo-app:test . && rm build.tar

docker run -it -dp 8083:80 garronej/keycloakify-demo-app:test

# http://localhost:8083/keycloakify-demo-app won't work because of the nginx.config for / and not /keycloakify-demo-app
```

# Keycloak theme only

If you are only looking to create a keycloak theme, there are a lot of things you should remove after clicking ![image](https://user-images.githubusercontent.com/6702424/98155461-92395e80-1ed6-11eb-93b2-98c64453043f.png):  

- You can remove all things related to building a docker image and publishing on github pages: 
  remove [these lines](https://github.com/garronej/keycloakify-demo-app/blob/fc6bcb98b8d09ed13b5f52ed8d39923511669000/.github/workflows/ci.yaml#L45-L109) 
  and [this line](https://github.com/garronej/keycloakify-demo-app/blob/fc6bcb98b8d09ed13b5f52ed8d39923511669000/.github/workflows/ci.yaml#L118-L119) from `.github/workflows/ci.yaml`.
- All the assets will need to be served by Keycloak: remove `--external-assets` from [this](https://github.com/garronej/keycloakify-demo-app/blob/fc6bcb98b8d09ed13b5f52ed8d39923511669000/.github/workflows/ci.yaml#L21) line.  
- You can remove `/Dockerfile`, `Dockerfile.ci` ,`/.dockerignore` and `/nginx.conf`
- You can assume the app will only run in the context of Keycloak so you can remove [these lines](https://github.com/garronej/keycloakify-demo-app/blob/095e8e9b044044364ffb8a4c6e6a14e33674886e/src/index.tsx#L30-L31) 
  in `src/index.tsx` (and you can, of course, remove `src/App.tsx`, `App.css` ect...).
- Replaces [those lines](https://github.com/garronej/keycloakify-demo-app/blob/095e8e9b044044364ffb8a4c6e6a14e33674886e/src/index.tsx#L18-L23) by 
  `const kcContext = realKcContext ?? kcContextMocks.kcLoginContext;`, now if you run `yarn start` you will be able to debug the login page, replace `kcLoginContext` by
  `kcRegisterContext` and the register page will be loaded instead.
- You can remove the `homepage` field from [the package.json](https://github.com/garronej/keycloakify-demo-app/blob/095e8e9b044044364ffb8a4c6e6a14e33674886e/package.json#L2)

For the rest all stays the same, when your theme is ready, just upgrade the version in `package.json` and push.  
You will find your theme packaged in a `.tar` file in the GitHub releases of your project.

