const UPDATE_ON_CONNECTED = Symbol('UPDATE_ON_CONNECTED');

export const withObservedProperties = (Base = HTMLElement) =>
  class extends Base {
    constructor () {
      super();
      const { observedProperties = [] } = this.constructor;
      this[UPDATE_ON_CONNECTED] = [];

      if (typeof this.propertyChangedCallback === 'function') {
        observedProperties.forEach(propName => {
          const initialValue = this[propName];
          const PROP_NAME = Symbol(propName);

          this[PROP_NAME] = initialValue;

          Object.defineProperty(this, propName, {
            get () {
              return this[PROP_NAME];
            },
            set (value) {
              const oldValue = this[PROP_NAME];
              this[PROP_NAME] = value;
              this.propertyChangedCallback(propName, oldValue, value);
            }
          });

          if (typeof initialValue !== 'undefined') {
            this[UPDATE_ON_CONNECTED].push(propName);
          }
        });
      }
    }

    connectedCallback () {
      this[UPDATE_ON_CONNECTED]
        .forEach(propName => {
          this.propertyChangedCallback(propName, undefined, this[propName]);
        });

      super.connectedCallback && super.connectedCallback();
    }
  };
