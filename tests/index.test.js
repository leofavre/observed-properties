import withObservedProperties from '../src/index.js';
import sinon from 'sinon';

let dummy;
let spy;

describe('withObservedProperties', () => {
  beforeEach(() => {
    spy = sinon.spy();
  });

  afterEach(() => {
    dummy = undefined;
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
    dummy = document.createElement('attr-cb-defined-after');

    dummy.attributeChangedCallback = function (attrName, oldValue, newValue) {
      spy(attrName, oldValue, newValue);
    };

    dummy.setAttribute('rate', 50);

    expect(spy).not.to.have.been.called;
  });

  it('Should not call propertyChangedCallback ' +
    'if it is defined after observedProperties.', () => {
    class PropCbDefinedAfter extends withObservedProperties(HTMLElement) {
      static get observedProperties () {
        return ['rate'];
      }
    }

    window.customElements.define('prop-cb-defined-after', PropCbDefinedAfter);
    dummy = document.createElement('prop-cb-defined-after');

    dummy.propertyChangedCallback = function (propName, oldValue, newValue) {
      spy(propName, oldValue, newValue);
    };

    dummy.rate = 50;

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
    dummy = document.createElement('attr-cb-args');
    dummy.setAttribute('rate', 50);

    expect(spy).to.have.been.calledWith('rate', null, '50');
  });

  it('Should call propertyChangedCallback ' +
    'with property name, old value and new value.', () => {
    class PropCbArgs extends withObservedProperties(HTMLElement) {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    window.customElements.define('prop-cb-args', PropCbArgs);
    dummy = document.createElement('prop-cb-args');
    dummy.rate = 50;

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
    dummy = document.createElement('attr-no-observed');
    dummy.setAttribute('rate', 50);

    expect(spy).not.to.have.been.called;
  });

  it('Should not call propertyChangedCallback when ' +
    'there are no observed properties.', () => {
    class PropNoObserved extends withObservedProperties(HTMLElement) {
      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    window.customElements.define('prop-no-observed', PropNoObserved);
    dummy = document.createElement('prop-no-observed');
    dummy.rate = 50;

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
    dummy = document.createElement('attr-unobserved');
    dummy.setAttribute('unobserved', 50);

    expect(spy).not.to.have.been.called;
  });

  it('Should not call propertyChangedCallback when ' +
    'an unobserved property is set.', () => {
    class PropUnobserved extends withObservedProperties(HTMLElement) {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    window.customElements.define('prop-unobserved', PropUnobserved);
    dummy = document.createElement('prop-unobserved');
    dummy.unobserved = 50;

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
    dummy = document.createElement('attr-same-value');

    dummy.setAttribute('rate', 50);
    dummy.setAttribute('rate', 50);

    expect(spy).to.have.been.calledTwice;
  });

  it('Should call propertyChangedCallback even when ' +
    'an observed property is set with the same value.', () => {
    class PropSameValue extends withObservedProperties(HTMLElement) {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    window.customElements.define('prop-same-value', PropSameValue);
    dummy = document.createElement('prop-same-value');

    dummy.rate = 50;
    dummy.rate = 50;

    expect(spy).to.have.been.calledTwice;
  });

  it('Shoud correctly access getters.', () => {
    class PropGetter extends withObservedProperties(HTMLElement) {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    window.customElements.define('prop-getter', PropGetter);
    dummy = document.createElement('prop-getter');
    dummy.rate = 40;
    expect(dummy.rate).to.equal(40);
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
    dummy = document.createElement('prop-inherited');

    document.body.appendChild(dummy);
    expect(spy).to.have.been.calledWith('rate', undefined, 40);

    dummy.rate = 80;
    expect(spy).to.have.been.calledWith('rate', 40, 80);

    dummy.rate = undefined;
    expect(spy).to.have.been.calledWith('rate', 80, undefined);

    document.body.removeChild(dummy);
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
    dummy = document.createElement('attr-this');

    dummy.setAttribute('rate', 500);
    expect(spy).to.have.been.calledWith(dummy);
  });

  it('Should verify that the this keyword points to the ' +
  'component instance in propertyChangedCallback.', () => {
    class propThis extends withObservedProperties(HTMLElement) {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback () {
        spy(this);
      }
    }

    window.customElements.define('prop-this', propThis);
    dummy = document.createElement('prop-this');

    dummy.rate = 500;
    expect(spy).to.have.been.calledWith(dummy);
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

    dummy = document.createElement('late-attr');
    dummy.setAttribute('rate', '33');

    document.body.appendChild(dummy);
    expect(spy).not.to.have.been.called;

    window.customElements.define('late-attr', LateAttr);
    expect(spy).to.have.been.calledWith('rate', null, '33');

    document.body.removeChild(dummy);
  });

  it('Should trigger propertyChangedCallback after the element is ' +
    'defined and appended to the DOM.', () => {
    class LateProp extends withObservedProperties(HTMLElement) {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    dummy = document.createElement('late-prop');
    dummy.rate = '33';

    document.body.appendChild(dummy);
    expect(spy).not.to.have.been.called;

    window.customElements.define('late-prop', LateProp);
    expect(spy).to.have.been.calledWith('rate', undefined, '33');

    document.body.removeChild(dummy);
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

    dummy = document.createElement('late-attr-unobserved');
    dummy.removeAttribute('rate');

    document.body.appendChild(dummy);
    expect(spy).not.to.have.been.called;

    window.customElements.define('late-attr-unobserved', LateAttrUnobserved);
    expect(spy).not.to.have.been.called;

    document.body.removeChild(dummy);
  });

  it('Should not trigger propertyChangedCallback after the element ' +
    'is defined and appended but no properties change.', () => {
    class LatePropUnobserved extends withObservedProperties(HTMLElement) {
      static get observedProperties () {
        return ['rate'];
      }

      propertyChangedCallback (propName, oldValue, newValue) {
        spy(propName, oldValue, newValue);
      }
    }

    dummy = document.createElement('late-prop-unobserved');
    dummy.rate = undefined;

    document.body.appendChild(dummy);
    expect(spy).not.to.have.been.called;

    window.customElements.define('late-prop-unobserved', LatePropUnobserved);
    expect(spy).not.to.have.been.called;

    document.body.removeChild(dummy);
  });

  it('Should call the inherited connectedCallback.', () => {
    class Parent extends HTMLElement {
      connectedCallback () {
        spy();
      }
    }

    class HasConnected extends withObservedProperties(Parent) {}

    window.customElements.define('has-connected', HasConnected);
    dummy = document.createElement('has-connected');
    document.body.appendChild(dummy);
    expect(spy).to.have.been.called;
    document.body.removeChild(dummy);
  });
});
