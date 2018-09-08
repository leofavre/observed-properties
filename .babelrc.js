const { BABEL_ENV } = process.env;

const presets = BABEL_ENV === 'cjs'
  ? [['@babel/preset-env', { targets: '> 0.25%, not dead' }]]
  : [];

module.exports = { presets };
