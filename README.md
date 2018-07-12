# observedProperties

Ever wondered why native web components have an API to handle attribute changes but not property changes? This script implements both `observedProperties` and `propertyChangedCallback`.

In the background, it uses ES6 getters and setters to cause a side-effect everytime a property changes.

## Install

```bash
npm install observed-properties --save
```

## Usage

### Import

Import `withObservedProperties`. Use the whole path to the `index.js` file if you want the script to [work on modern browsers natively](https://caniuse.com/#feat=es6-module) without a build process.

```javascript
import { withObservedProperties } from './node_modules/observed-properties/index.js';
```

### Enhance HTMLElement

Enhance the `HTMLElement` by passing it to the `withObservedProperties` helper.

```javascript
const EnhancedHTMLElement = withObservedProperties(HTMLElement);
```

### Extend

Create a new web component class that extends the `EnhancedHTMLElement`.

```javascript
class TopTen extends EnhancedHTMLElement {}
```

### Create a component

Use `observedProperties` and `propertyChangedCallback` just like you would use `observedAttributes` and `attributeChangedCallback`.

```javascript
import { withObservedProperties } from './node_modules/observed-properties/index.js';

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
```