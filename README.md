<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/110417203-6bae4e80-8095-11eb-8211-2592a5758668.png">  
</p>
<p align="center">
    <i></i>
    <br>
    <br>
    <img src="https://github.com/garronej/keycloakify-demo-app/workflows/ci/badge.svg?branch=main">
</p>

This repo consitute an easyly resusable CI setup for React App in general and App's that generates Keycloaks's theme 
using [`keycloakify`](https://github.com/InseeFrLab/keycloakify) in particular.


- To release **don't create a tag manually**, the CI do it for you. Juste update the `package.json`'s version field an push.
- The `.jar` files that bundle the Keycloak theme will be attached as asset with every GitHub release. [example](https://github.com/InseeFrLab/keycloakify-demo-app/releases/tag/v0.1.0)).
- The CI publishes the App docker immage on DockerHub. `<org>/<repo>:main` for each commits on `main`  
  and `<org>/<repo>:latest` and `<org>/<repo>:X.Y.Z` when releasing a new version. [See on DockerHub](https://hub.docker.com/r/garronej/keycloakify-demo-app/tags?page=1&ordering=last_updated)
- A [CHANGELOG.md](https://github.com/InseeFrLab/keycloakify-demo-app/blob/main/CHANGELOG.md) will be mainained for you using the commit messages between releases. *If you don't want a specific commit to appear
  in the changelog do something like. `git commit -am "yadi yada (changelog ignore)`.*

# DockerHub credentials

To enables the CI to publish on DockerHub on your behaf go to 
repository ``Settings`` tab, then ``Secrets`` you will need to add two new secrets:
- ``DOCKERHUB_TOKEN``, you Dockerhub authorization token.
- ``DOCKERHUB_USERNAME``, Your Dockerhub username.



# Results

- You can find the theme for a specific release in the assets, example:

 ![image](https://user-images.githubusercontent.com/6702424/110415780-ceeab180-8092-11eb-98a5-68ded9bfeeb7.png)
