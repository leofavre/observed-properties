const babel = require('rollup-plugin-babel');
const { BROWSER, BABEL_ENV } = process.env;

module.exports = () => {
  const plugins = [
    babel()
  ];

  const format = BROWSER ? 'iife' : BABEL_ENV;
  const path = BROWSER ? `browser/${BABEL_ENV}` : `${BABEL_ENV}`;

  return {
    input: 'src/index.js',
    output: {
      format,
      file: `dist/${path}/index.js`,
      name: 'withObservedProperties'
    },
    plugins
  };
};
