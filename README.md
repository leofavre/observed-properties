# Observed Properties

### Observed properties for native web components.

![](https://travis-ci.org/leofavre/observed-properties.svg?branch=master)

Have you ever wondered why native web components have an API to handle attribute changes but not property changes?

This script implements both `observedProperties` and `propertyChangedCallback` that behave just like `observedAttributes` and `attributeChangedCallback` do.

In the background, it uses ES6 getters and setters to cause a side-effect — run the callback method — everytime a property changes.

## Install

```bash
npm install observed-properties --save
```

## Import

Import `withObservedProperties`.

```javascript
import { withObservedProperties } from 'observed-properties';
```

Use the whole path to the `index.js` file if you want the script to [work on modern browsers natively](https://caniuse.com/#feat=es6-module), without having to depend on a build process.

```javascript
import { withObservedProperties } from './node_modules/observed-properties/index.js';
```

## Enhance HTMLElement

Enhance the `HTMLElement` by passing it to the `withObservedProperties` helper.

```javascript
const EnhancedHTMLElement = withObservedProperties(HTMLElement);
```

## Extend

Create a new web component class that extends `EnhancedHTMLElement`.

```javascript
class TopTen extends EnhancedHTMLElement {}
```

## Observe changes

Tell the component which properties to observe by setting `observedProperties`.

```javascript
class TopTen extends EnhancedHTMLElement {
  static get observedProperties () {
    return ['songs'];
  }
}
```

## React to changes

Set `propertyChangedCallback`, the method that will be run everytime a property changes.

```javascript
class TopTen extends EnhancedHTMLElement {
  static get observedProperties () {
    return ['songs'];
  }

  propertyChangedCallback (propName, oldValue, value) {
    if (propName === 'songs' && oldValue !== value) {
      this.render(value);
    }
  }
}
```

## Complete example

```javascript
import { withObservedProperties } from 'observed-properties';

const EnhancedHTMLElement = withObservedProperties(HTMLElement);

class TopTen extends EnhancedHTMLElement {
  static get observedProperties () {
    return ['songs'];
  }

  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
  }

  propertyChangedCallback (propName, oldValue, value) {
    if (propName === 'songs' && oldValue !== value) {
      this.render(value);
    }
  }

  render (value = []) {
    this.shadowRoot.innerHTML = `
      <dl>
        ${value.map(song => `
          <dt>${song.name}</dt>
          <dd>${song.artist} – ${song.year}</dd>
        `).join('')}
      </dl>
    `;
  }
}

window.customElements.define('top-ten', TopTen);
```

## Known issues

This script does not play along with Polymer, SkateJS and probably other web component libraries. The reason is that they use the same approach to detect if a property has changed, by using getters and setters, which causes conflicts.

The good news, though, is that, if you are using a web component library, you probably do not need another way of detecting property changes, since they already offer this functionality.
