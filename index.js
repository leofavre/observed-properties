const UPDATE_ON_CONNECTED = Symbol('UPDATE_ON_CONNECTED');

export const withObservedProperties = (Base = HTMLElement) =>
  class extends Base {
    constructor () {
      super();
      const { observedProperties = [] } = this.constructor;
      this[UPDATE_ON_CONNECTED] = [];

      if (typeof this.propertyChangedCallback === 'function') {
        observedProperties.forEach(propName => {
          const inheritedValue = this[propName];
          const PROP_NAME = Symbol(propName);
          this[PROP_NAME] = inheritedValue;

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

          this[UPDATE_ON_CONNECTED] = [...this[UPDATE_ON_CONNECTED], propName];
        });
      }
    }

    connectedCallback () {
      this[UPDATE_ON_CONNECTED]
        .forEach(propName => {
          if (typeof this[propName] !== 'undefined') {
            this.propertyChangedCallback(propName, undefined, this[propName]);
          }
        });

      super.connectedCallback && super.connectedCallback();
    }
  };
