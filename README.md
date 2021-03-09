<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/80216211-00ef5280-863e-11ea-81de-59f3a3d4b8e4.png">  
</p>
<p align="center">
    <i></i>
    <br>
    <br>
    <img src="https://github.com/garronej/keycloakify-demo-app/workflows/ci/badge.svg?branch=main">
    <img src="https://img.shields.io/bundlephobia/minzip/keycloakify-demo-app">
    <img src="https://img.shields.io/npm/dw/keycloakify-demo-app">
    <img src="https://img.shields.io/npm/l/keycloakify-demo-app">
</p>
<p align="center">
  <a href="https://github.com/garronej/keycloakify-demo-app">Home</a>
  -
  <a href="https://github.com/garronej/keycloakify-demo-app">Documentation</a>
</p>

# This repo is the source code of this website


# Dev

```bash

# Manually run the build and run the docker image

docker build -f Dockerfile.dev -t garronej/funcamp:dev .

docker run \
    -itd \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    garronej/funcamp:dev


# OR Relying on docker compose

docker-compose -f docker-compose.dev.yml up -d --build
# To run each time the dependencies have changed.
# After that it is possible to use docker dashboard to start the app.
# the app is available on http://localhost:3001

```

# Prod

```bash
docker build -f Dockerfile.prod -t garronej/funcamp:prod .
docker run -it --rm -p 1337:80 garronej/funcamp:prod

#OR

docker-compose -f docker-compose.prod.yml up -d --build
```
