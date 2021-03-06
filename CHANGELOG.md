## [3.0.1](https://github.com/leofavre/observed-properties/compare/v3.0.0...v3.0.1) (2018-10-15)


### Bug Fixes

* Standardize documentation with other repositories ([9c09aa6](https://github.com/leofavre/observed-properties/commit/9c09aa6))

# [3.0.0](https://github.com/leofavre/observed-properties/compare/v2.0.3...v3.0.0) (2018-10-14)


### Bug Fixes

* Use `class {}` as base instead of `HTMLElement` ([429f88b](https://github.com/leofavre/observed-properties/commit/429f88b))


### BREAKING CHANGES

* Use an empty `class {}` as base instead of `HTMLElement`

## 2.0.3 - 2018-09-16

### Fixed

- Again, Travis CI configuration for automatic deployment.


## 2.0.2 - 2018-09-08

### Fixed

- Travis CI configuration for automatic deployment.


## 2.0.1 - 2018-09-08

### Fixed

- Incorrect example on Readme.


## 2.0.0 - 2018-09-08

### Fixed

- Now the package has three distribution formats: ES6 modules, CommonJS and a global variable for browsers. This breaks the way importing behaves, making this release a major release.


## 1.0.1 - 2018-07-26

### Fixed

- Improved code readability.


## 1.0.0 - 2018-07-25

### Fixed

- Made `propertyChangedCallback` mimic the way `attributeChangedCallback` is dispatched on `connectedCallback`.


## 0.1.9 - 2018-07-18

### Fixed

- Fixed a bug that made `this` not to point to the component instance inside `propertyChangedCallback`.


## 0.1.8 - 2018-07-16

### Fixed

- Tiny improvement to Readme.


## 0.1.7 - 2018-07-16

### Added

- Tagline and known issues to Readme.


## 0.1.6 - 2018-07-14

### Fixed

- Fixed a bug that caused `propertyChangedCallback` to be called even if defined after `observedProperties`.


## 0.1.5 - 2018-07-13

### Fixed

- Fixed a bug that caused the script to prioritize inherited property values over set ones.


## 0.1.4 - 2018-07-13

### Added

- Travis CI Build: Passing badge.


## 0.1.3 - 2018-07-12

### Fixed

- Handling inherited properties.
- Improved documentation.


## 0.1.2 - 2018-07-12

### Fixed

- [Use Symbols as keys to avoid collision.](https://github.com/leofavre/observed-properties/issues/11)


## 0.1.1 - 2018-07-12

### Added

- Automatic `npm publish` with Travis CI.

### Fixed

- Improved examples.


## 0.1.0 - 2018-07-12

### Added

- Documentation.
- withObservedProperties and tests.
- Travis configuration file.
- Semi Standard linter.
- Test environment.
