export const withObservedProperties = (Base = HTMLElement) =>
  class extends Base {
    constructor () {
      super();
      const { propertyChangedCallback } = this;
      const { observedProperties = [] } = this.constructor;

      if (typeof propertyChangedCallback === 'function') {
        observedProperties.forEach(propName => {
          const inheritedValue = this[propName];
          const privateKey = Symbol(propName);
          this[privateKey] = inheritedValue;

          Object.defineProperty(this, propName, {
            get () {
              return this[privateKey];
            },
            set (value) {
              const oldValue = this[privateKey];
              this[privateKey] = value;
              propertyChangedCallback(propName, oldValue, value);
            }
          });
        });
      }
    }
  };
