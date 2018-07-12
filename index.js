export const withObservedProperties = (Base = HTMLElement) =>
  class extends Base {
    constructor () {
      super();
      const { observedProperties = [] } = this.constructor;

      observedProperties.forEach(propName => {
        Object.defineProperty(this, propName, {
          get () {
            return this[`_${propName}`];
          },
          set (value) {
            const oldValue = this[`_${propName}`];
            this[`_${propName}`] = value;

            if (typeof this.propertyChangedCallback === 'function') {
              this.propertyChangedCallback(propName, oldValue, value);
            }
          }
        });
      });
    }
  };
