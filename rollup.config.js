const { OUTPUT_FORMAT } = process.env;

module.exports = {
  input: 'src/index.js',
  output: {
    format: OUTPUT_FORMAT,
    file: `dist/${OUTPUT_FORMAT}/index.js`,
    name: 'withObservedProperties'
  }
};
