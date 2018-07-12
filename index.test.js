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

describe('withObservedProperties', () => {
  it('Should not trigger propertyChangedCallback when ' +
    'there are no observed properties.', () => {
    const testElement = document.createElement('unobserved-rate');
    testElement.propertyChangedCallback = sinon.spy();
    testElement.rate = 50;

    expect(testElement.propertyChangedCallback).not.to.have.been.called;
  });

  it('Should trigger propertyChangedCallback when ' +
    'an observed property changes.', () => {
    const testElement = document.createElement('observed-rate');
    testElement.propertyChangedCallback = sinon.spy();
    testElement.rate = 50;

    expect(testElement.propertyChangedCallback).to.have.been
      .calledWith('rate', undefined, 50);
  });

  it('Should make getters for the observed properties.', () => {
    const testElement = document.createElement('observed-rate');
    testElement.rate = 50;
    expect(testElement.rate).to.equal(testElement._rate);
  });
});
