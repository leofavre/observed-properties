const babel = require('rollup-plugin-babel');
const { BABEL_ENV } = process.env;

module.exports = () => {
  const plugins = [
    babel()
  ];

  return {
    input: 'src/index.js',
    output: {
      format: BABEL_ENV,
      file: `dist/${BABEL_ENV}/index.js`,
      name: 'withObservedProperties'
    },
    plugins
  };
};
