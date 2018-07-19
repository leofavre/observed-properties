export const withObservedProperties = (Base = HTMLElement) =>
  class extends Base {
    constructor () {
      super();
      const { observedProperties = [] } = this.constructor;

      if (typeof this.propertyChangedCallback === 'function') {
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
              this.propertyChangedCallback(propName, oldValue, value);
            }
          });
        });
      }
    }
  };
