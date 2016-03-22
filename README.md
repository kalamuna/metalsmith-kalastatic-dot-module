# metalsmith-kalastatic-dot-module
Metalsmith plugin to automatically ingest Drupal resources (css/js) provided by [kalastatic-dot-module](https://www.drupal.org/sandbox/sonictruth/2624634)

Given ```stylesURL``` and ```scriptsURL``` (of a drupal instance with the  eg: ```http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-css``` and ```http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-js``` metalsmith-kalastatic-dot-module creates metadata of the snippets for your kalastatic build to include those assets in your prototype (to prototype against the same base-styles and scripts of the final site).

## Usage
```npm install metalsmith-kalastatic-dot-module --save```

### CLI
add to metalsmith.json up top…
```
    "metalsmith-kalastatic-dot-module": {
      "stylesURL": "http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-css",
      "scriptsURL": "http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-js"
    },
```

### JS
```
  var kstatDotMod = require('metalsmith-kalastatic-dot-module');
  var Metalsmith = require('metalsmith');

  var m = Metalsmith()
  .use(kstatDotMod({
    stylesURL: "http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-css",
    scriptsURL: "http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-js"
  }))
  m.build();
  ```
  
  your variables will now be available as
  ```kstatic.scripts``` and ```kstatic.styles```

## Configuration

### `stylesURL`

Required. The URL to download to assume as the Drupal CSS assets.

Example: `http://example.com/styles.html`

### `scriptsURL`

Required. The URL to download to assume as the Drupal JavaScript assets.

Example: `http://example.com/scripts.html`

### `base`

Optional. The base URL for the above styles and scripts URL. If this is provided, the above urls become relative from `/`. Deault is ''.

### `replaceBase`

Optional. When `true` will remove the `base` from the output script and style tags. This will allow referencing relative assets rather then using the absolute URLs. If you are development directly on the prototype and want to bring in the Drupal assets from the base location, set this to `false`. Default is `false`.
