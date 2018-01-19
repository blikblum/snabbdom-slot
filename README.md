# snabbdom-slot

[![NPM version](http://img.shields.io/npm/v/generator-javascript.svg?style=flat-square)](https://www.npmjs.com/package/snabbdom-slot)
[![NPM downloads](http://img.shields.io/npm/dm/generator-javascript.svg?style=flat-square)](https://www.npmjs.com/package/snabbdom-slot)

> shadowDom slot system like for snabbdom stateless components


### Features

  &nbsp; &nbsp; ✓ slot system based on web component / [shadowDOM spec](https://developers.google.com/web/fundamentals/web-components/shadowdom)<br>
  &nbsp; &nbsp; ✓ works with JSX or hyperscript<br>



### Usage

````jsx harmony
import { withSlot } from 'snabbdom-slot'
import Snabbdom from 'snabbdom-pragma'

const Component = withSlot((props) => {
  return (
   <div>
     <div>My {props.name || 'nice'} component</div>
     <slot name="header">Default Header</slot>
     <slot>Default body</slot>
     <slot name="footer">Default footer</slot>
   </div> 
  )  
})

const tree = (
  <Component name="great">
    <div slot="header">Custom title</div>
    <div slot="footer">All rights reserved</div>
    <div>Main content</div>
    <div>More content</div>
  </Component>
)

//render tree with snabbdom
````

Output
```html
   <div>
     <div>My great component</div>
     <slot name="header">
       <div slot="header">Custom title</div>
     </slot>
     <slot>
       <div>Main content</div>
       <div>More content</div>
     </slot>
     <slot name="footer">
       <div slot="footer">All rights reserved</div>
     </slot>
   </div> 
```

Check [this](https://webkit.org/blog/4096/introducing-shadow-dom-api/) for more info about slot element behavior

### License

Copyright © 2015-2016 Luiz Américo Pereira Câmara. This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/kriasoft/react-starter-kit/blob/master/LICENSE.txt) file.
The documentation to the project is licensed under the [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
license.


