export const withObservedProperties = (Base = HTMLElement) =>
  class extends Base {
    constructor () {
      super();
      const { observedProperties = [] } = this.constructor;
      observedProperties.forEach(propName => {
        const originalValue = this[propName];
        const privateKey = Symbol(propName);

        Object.defineProperty(this, propName, {
          get () {
            return this[privateKey];
          },
          set (value) {
            const oldValue = (originalValue != null)
              ? originalValue
              : this[privateKey];

            this[privateKey] = value;

            if (typeof this.propertyChangedCallback === 'function') {
              this.propertyChangedCallback(propName, oldValue, value);
            }
          }
        });
      });
    }
  };
