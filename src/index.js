const UPDATE_ON_CONNECTED = Symbol('UPDATE_ON_CONNECTED');

const withObservedProperties = (Base = HTMLElement) =>
  class extends Base {
    constructor () {
      super();
      const { observedProperties = [] } = this.constructor;
      this[UPDATE_ON_CONNECTED] = [];

      if (typeof this.propertyChangedCallback === 'function') {
        observedProperties.forEach(propName => {
          const initialValue = this[propName];
          const CACHED_VALUE = Symbol(propName);

          this[CACHED_VALUE] = initialValue;

          Object.defineProperty(this, propName, {
            get () {
              return this[CACHED_VALUE];
            },
            set (value) {
              const oldValue = this[CACHED_VALUE];
              this[CACHED_VALUE] = value;
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

export default withObservedProperties;
