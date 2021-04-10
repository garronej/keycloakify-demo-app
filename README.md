<p align="center">
    <img src="https://github.com/garronej/keycloakify-demo-app/workflows/ci/badge.svg?branch=main">
</p>

This repo constitutes an easily reusable CI setup for React App in general, and Apps that generates Keycloaks's theme 
using [keycloakify](https://github.com/InseeFrLab/keycloakify) in particular.

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

