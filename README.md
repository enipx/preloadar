# Preloadar

lightweight (**5 kb**) preloader for your web project in simple steps!

**Preloadar** is a lightweight and easy solution for preloading your web. Whether you are trying to preload automatically, manually, or on an asynchronous request, Preloadar makes it all very easy.

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Animations](#animations)
- [Types](#types)
- [Options](#options)
- [Examples](#examples)
- [License](#license)

## Install

```sh
# Usage with NPM
$ npm install --save preloadar
```

```html
<!-- include the script located on the `dist` -->
<script src="dist/preloadar.js"></script>
```

Load it with your favorite module loader or use as a global variable

```js
// ES6 modules
import preloadar from 'preloadar'

// CommonJS modules
const preloadar = require('preloadar')
```

And remember to add styles

```scss
// Webpack
@import '~preloadar/preloadar.css';
@import '~preloadar/preloadar.min.css'; // minified

// Other
@import './node_modules/preloadar/dist/preloadar.css';
@import './node_modules/preloadar/dist/preloadar.min.css'; // minified
```

## Usage

**STEP 1** - In HTML, add a `div` element with the id of `preloadar` or any of your choice directly inside the body, e.g:

```html
<div id="preloadar"></div>
```

**STEP 2** - Simply initialize preloadar with html preloadar identifier in your script file:

```js
preloadar.run().auto("#preloadar", {
   animation: "spin",
   onComplete: () => {
      // Do something here
      alert("Complete")
   }
});
```

**STEP 3 (Optional)** - This is a use case when you are trying to preload your page when a user visits the page automatically, So for an even more smooth experience, At the div that wraps all your page elements to display after preloadar is complete, add an id of `preloadarContainer`. <br><br>Overall here is how your page will be structured when using **STEP 3**:

```html
<body>
   <div id="preloadar"></div>

   <div id="preloadarContainer" class="...">
      <!-- All page content goes here  -->
   </div>
</body>
```

## Animations
In **Preloadar** you can easily change animation's options,

The library supports several animations:
- `spin`
- `spin1`
- `spin2`
- `ripple`
- `ripple1`
- `ripple2`
- `waiting`
- `waiting1`
- `waiting2`
- `flip`
- `flip1`
- `flip2`
- `frequency`
- `frequency1`
- `frequency2`
- `scale` - child element required. support image, svg, etc.
- `rotate` - child element required. support image, svg, etc.
- `topBar`

you can add a custom animation of your choice by just adding your animation inside your preloadar `identifier` element and specify an empty string or `custom` in the `animation` option.

## Types

There are 4 ways to use this preloadar<br>

**Auto**: load page automatically with preloadar when visiting the page

Use case:
```js
preloadar.run().auto(`identifier`,{
  animation: "spin",
  ...
});
```

**Manual**: load page manually with preloadar when visiting the page

Use case:
```js
preloadar.run().manual(`identifier`,{
  animation: "spin",
  ...
});
```

**Show**: display preloadar when this is called - this is comes in handy when you'd like to use preloadar to async load an item and others.

Use case:
```js
preloadar.run().show(`identifier`,{
  animation: "spin",
  ...
});
```

**Hide**: hide preloadar when this is called - this is comes in handy when you'd like to use preloadar to async load an item and others.

Use case:
```js
preloadar.run().hide(`identifier`, {
   onComplete: () => {
      ...
   }
});
```

## Options

| Property | Type | Description | Default  |
|---------------------------|-------------|---------------|---------|
| `animation` | String | add animation style to the preloadar | `spin` |
| `delay` | Number | use case when tying to delay preloadar animation after complete before closing it | `500` |
| `start` | Number | use case in preloadar manual type when trying to use start in preloader, start at 0 and ends at 100 by default | `0` |
| `end` | Number | use case in preloadar manual type when trying to use end in preloader | `100` |
| `step` | Number | use case in preloadar manual type when trying to use step in preloader  | `1` |
| `color` | String | change preloadar style color  | `#2b84e4` |
| `secondaryColor` | String | change preloadar style secondary color  | `#e8e7e7` |
| `bgColor` | String | change preloadar style bg color  | `#ffffff` |
| `progressElement` | String | preloadar progress when using manual type | `none` |
| `onActive` | Function | run function when preloadar becomes active | `none` |
| `onComplete` | Function | run function when preloadar is complete | `none` |
<hr>

You can set options during Preloadar initialization, e.g:

```js
preloadar.run().auto(`identifier`,{
  animation: "spin",
  delay: 200,
  onComplete: () => {
     alert("Preloadar complete")
  }
});
```

## Examples

use the preloadar generator [here](https://enipx.github.io/preloadar).

## License

Created by [Hashir](https://github.com/enipx). Released under the [MIT License](https://github.com/enipx/preloadar/blob/master/LICENSE).
