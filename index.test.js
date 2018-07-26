import { withObservedProperties } from './index.js';
import sinon from 'sinon';

let testEl;
let spy;

describe('withObservedProperties', () => {
  beforeEach(() => {
    spy = sinon.spy();
  });

  afterEach(() => {
    testEl = undefined;
    spy = undefined;
  });

  it('Should verify that attributeChangedCallback is not called ' +
    'if it is defined after observedAttributes.', () => {
    class AttrCbDefinedAfter extends HTMLElement {
      static get observedAttributes () {
        return ['rate'];
      }
    }

    window.customElements.define('attr-cb-defined-after', AttrCbDefinedAfter);
    testEl = document.createElement('attr-cb-defined-after');

    testEl.attributeChangedCallback = function (attrName, oldValue, newValue) {
      spy(attrName, oldValue, newValue);
    };

    testEl.setAttribute('rate', 50);

    expect(spy).not.to.have.been.called;
  });

  it('Should not call propertyChangedCallback ' +
    'if it is defined after observedProperties.', () => {
    class PropCbDefinedAfter extends withObservedProperties() {
      static get observedProperties () {
        return ['rate'];
      }
    }

    window.customElements.define('prop-cb-defined-after', PropCbDefinedAfter);
    testEl = document.createElement('prop-cb-defined-after');

    testEl.propertyChangedCallback = function (propName, oldValue, newValue) {
      spy(propName, oldValue, newValue);
    };

    testEl.rate = 50;

    expect(spy).not.to.have.been.called;
  });

  it('Should verify that attributeChangedCallback is called ' +
    'with attribute name, old value and new value.', () => {
    class AttrCbArgs extends HTMLElement {
      static get observedAttributes () {
        return ['rate'];
      }

      attributeChangedCallback (attrName, oldValue, newValue) {
        spy(attrName, oldValue, newValue);
      }
    }

    window.customElements.define('attr-cb-args', AttrCbArgs);
    testEl = document.createElement('attr-cb-args');
    testEl.setAttribute('rate', 50);

    expect(spy).to.have.been.calledWith('rate', null, '50');
  });

  it('Should call propertyChangedCallback ' +
    'with property name, old value and new value.', () => {
    class PropCbArgs extends withObservedProperties() {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    window.customElements.define('prop-cb-args', PropCbArgs);
    testEl = document.createElement('prop-cb-args');
    testEl.rate = 50;

    expect(spy).to.have.been.calledWith('rate', undefined, 50);
  });

  it('Should verify that attributeChangedCallback is not called ' +
    'if there are no observed attributes.', () => {
    class AttrNoObserved extends HTMLElement {
      attributeChangedCallback (attrName, oldValue, newValue) {
        spy(attrName, oldValue, newValue);
      }
    }

    window.customElements.define('attr-no-observed', AttrNoObserved);
    testEl = document.createElement('attr-no-observed');
    testEl.setAttribute('rate', 50);

    expect(spy).not.to.have.been.called;
  });

  it('Should not call propertyChangedCallback when ' +
    'there are no observed properties.', () => {
    class PropNoObserved extends withObservedProperties() {
      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    window.customElements.define('prop-no-observed', PropNoObserved);
    testEl = document.createElement('prop-no-observed');
    testEl.rate = 50;

    expect(spy).not.to.have.been.called;
  });

  it('Should verify that attributeChangedCallback is not called ' +
    'if an unobserved attribute is set.', () => {
    class AttrUnobserved extends HTMLElement {
      static get observedAttributes () {
        return ['rate'];
      }

      attributeChangedCallback (attrName, oldValue, newValue) {
        spy(attrName, oldValue, newValue);
      }
    }

    window.customElements.define('attr-unobserved', AttrUnobserved);
    testEl = document.createElement('attr-unobserved');
    testEl.setAttribute('unobserved', 50);

    expect(spy).not.to.have.been.called;
  });

  it('Should not call propertyChangedCallback when ' +
    'an unobserved property is set.', () => {
    class PropUnobserved extends withObservedProperties() {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    window.customElements.define('prop-unobserved', PropUnobserved);
    testEl = document.createElement('prop-unobserved');
    testEl.unobserved = 50;

    expect(spy).not.to.have.been.called;
  });

  it('Should verify that attributeChangedCallback is called even when ' +
    'an observed attribute is set with the same value.', () => {
    class AttrSameValue extends HTMLElement {
      static get observedAttributes () {
        return ['rate'];
      }

      attributeChangedCallback (attrName, oldValue, newValue) {
        spy(attrName, oldValue, newValue);
      }
    }

    window.customElements.define('attr-same-value', AttrSameValue);
    testEl = document.createElement('attr-same-value');

    testEl.setAttribute('rate', 50);
    testEl.setAttribute('rate', 50);

    expect(spy).to.have.been.calledTwice;
  });

  it('Should call propertyChangedCallback even when ' +
    'an observed property is set with the same value.', () => {
    class PropSameValue extends withObservedProperties() {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    window.customElements.define('prop-same-value', PropSameValue);
    testEl = document.createElement('prop-same-value');

    testEl.rate = 50;
    testEl.rate = 50;

    expect(spy).to.have.been.calledTwice;
  });

  it('Shoud correctly access getters.', () => {
    class PropGetter extends withObservedProperties() {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    window.customElements.define('prop-getter', PropGetter);
    testEl = document.createElement('prop-getter');
    testEl.rate = 40;
    expect(testEl.rate).to.equal(40);
  });

  it('Should correctly handle property inheritance.', () => {
    class MainClass extends HTMLElement {
      constructor () {
        super();
        this.rate = 40;
      }
    }

    class PropInherited extends withObservedProperties(MainClass) {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    window.customElements.define('prop-inherited', PropInherited);
    testEl = document.createElement('prop-inherited');

    document.body.appendChild(testEl);
    expect(spy).to.have.been.calledWith('rate', undefined, 40);

    testEl.rate = 80;
    expect(spy).to.have.been.calledWith('rate', 40, 80);

    testEl.rate = undefined;
    expect(spy).to.have.been.calledWith('rate', 80, undefined);

    document.body.removeChild(testEl);
  });

  it('Should verify that the this keyword points to the ' +
  'component instance in attributeChangedCallback.', () => {
    class attrThis extends HTMLElement {
      static get observedAttributes () {
        return ['rate'];
      }

      attributeChangedCallback () {
        spy(this);
      }
    }

    window.customElements.define('attr-this', attrThis);
    testEl = document.createElement('attr-this');

    testEl.setAttribute('rate', 500);
    expect(spy).to.have.been.calledWith(testEl);
  });

  it('Should verify that the this keyword points to the ' +
  'component instance in propertyChangedCallback.', () => {
    class propThis extends withObservedProperties() {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback () {
        spy(this);
      }
    }

    window.customElements.define('prop-this', propThis);
    testEl = document.createElement('prop-this');

    testEl.rate = 500;
    expect(spy).to.have.been.calledWith(testEl);
  });

  it('Should verify that attributeChangedCallback is triggered ' +
    'after the element is defined and appended to the DOM.', () => {
    class LateAttr extends HTMLElement {
      static get observedAttributes () {
        return ['rate'];
      }

      attributeChangedCallback (attrName, oldValue, newValue) {
        spy(attrName, oldValue, newValue);
      }
    }

    testEl = document.createElement('late-attr');
    testEl.setAttribute('rate', '33');

    document.body.appendChild(testEl);
    expect(spy).not.to.have.been.called;

    window.customElements.define('late-attr', LateAttr);
    expect(spy).to.have.been.calledWith('rate', null, '33');

    document.body.removeChild(testEl);
  });

  it('Should trigger propertyChangedCallback after the element is ' +
    'defined and appended to the DOM.', () => {
    class LateProp extends withObservedProperties() {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    testEl = document.createElement('late-prop');
    testEl.rate = '33';

    document.body.appendChild(testEl);
    expect(spy).not.to.have.been.called;

    window.customElements.define('late-prop', LateProp);
    expect(spy).to.have.been.calledWith('rate', undefined, '33');

    document.body.removeChild(testEl);
  });

  it('Should verify that attributeChangedCallback is not triggered after ' +
    'the element is defined and appended but no attributes change.', () => {
    class LateAttrUnobserved extends HTMLElement {
      static get observedAttributes () {
        return ['rate'];
      }

      attributeChangedCallback (attrName, oldValue, newValue) {
        console.log(attrName, oldValue, newValue);
        spy(attrName, oldValue, newValue);
      }
    }

    testEl = document.createElement('late-attr-unobserved');
    testEl.removeAttribute('rate');

    document.body.appendChild(testEl);
    expect(spy).not.to.have.been.called;

    window.customElements.define('late-attr-unobserved', LateAttrUnobserved);
    expect(spy).not.to.have.been.called;

    document.body.removeChild(testEl);
  });

  it('Should not trigger propertyChangedCallback after the element ' +
    'is defined and appended but no properties change.', () => {
    class LatePropUnobserved extends withObservedProperties() {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    testEl = document.createElement('late-prop-unobserved');
    testEl.rate = undefined;

    document.body.appendChild(testEl);
    expect(spy).not.to.have.been.called;

    window.customElements.define('late-prop-unobserved', LatePropUnobserved);
    expect(spy).not.to.have.been.called;

    document.body.removeChild(testEl);
  });

  it('Should call the inherited connectedCallback.', () => {
    class Parent extends HTMLElement {
      connectedCallback () {
        spy();
      }
    }

    class HasConnected extends withObservedProperties(Parent) {}

    window.customElements.define('has-connected', HasConnected);
    testEl = document.createElement('has-connected');
    document.body.appendChild(testEl);
    expect(spy).to.have.been.called;
    document.body.removeChild(testEl);
  });
});
