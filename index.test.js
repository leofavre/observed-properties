import { withObservedProperties } from './index.js';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

class RateComponent extends withObservedProperties() {
  static get observedProperties () {
    return ['rate'];
  }
}

window.customElements.define('observed-rate', RateComponent);
window.customElements.define('unobserved-rate', withObservedProperties());

let testElement;

describe('withObservedProperties', () => {
  beforeEach(() => {
    testElement = document.createElement('observed-rate');
    testElement.propertyChangedCallback = sinon.spy();
  });

  afterEach(() => {
    testElement = undefined;
  });

  it('Should not trigger propertyChangedCallback when ' +
    'there are no observed properties.', () => {
    const blindTestElement = document.createElement('unobserved-rate');
    blindTestElement.propertyChangedCallback = sinon.spy();
    blindTestElement.rate = 300;

    expect(blindTestElement.propertyChangedCallback)
      .not.to.have.been.called;
  });

  it('Should not trigger propertyChangedCallback when ' +
    'an unobserved property is set.', () => {
    testElement.unosberved = 40;

    expect(testElement.propertyChangedCallback)
      .not.to.have.been.called;
  });

  it('Should trigger propertyChangedCallback when ' +
    'an observed property is set.', () => {
    testElement.rate = 50;

    expect(testElement.propertyChangedCallback)
      .to.have.been.calledWith('rate', undefined, 50);
  });

  it('Should trigger propertyChangedCallback even when ' +
    'an observed property is set but its value does not change.', () => {
    testElement.rate = 125;

    expect(testElement.propertyChangedCallback)
      .to.have.been.calledWith('rate', undefined, 125);

    testElement.rate = 125;

    expect(testElement.propertyChangedCallback)
      .to.have.been.calledWith('rate', 125, 125);
  });

  it('Should correctly access getters.', () => {
    testElement.propertyChangedCallback = undefined;
    testElement.rate = 85;

    expect(testElement.rate).to.equal(85);
  });
});
