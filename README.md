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

# Install / Import

```bash
$ npm install --save keycloakify-demo-app
```

```typescript
import { myFunction, myObject } from "keycloakify-demo-app";
```

Specific imports:

```typescript
import { myFunction } from "keycloakify-demo-app/myFunction";
import { myObject } from "keycloakify-demo-app/myObject";
```

## Import from HTML, with CDN

Import it via a bundle that creates a global ( wider browser support ):

```html
<script src="//unpkg.com/keycloakify-demo-app/bundle.min.js"></script>
<script>
    const { myFunction, myObject } = keycloakify_demo_app;
</script>
```

Or import it as an ES module:

```html
<script type="module">
    import { myFunction, myObject } from "//unpkg.com/keycloakify-demo-app/zz_esm/index.js";
</script>
```

_You can specify the version you wish to import:_ [unpkg.com](https://unpkg.com)

## Contribute

```bash
npm install
npm run build
npm test
```
