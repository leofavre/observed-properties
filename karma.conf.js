process.env.CHROME_BIN = require('puppeteer').executablePath();

const filesPattern = 'tests/index.test.js';

module.exports = (config) => {
  config.set({
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    browserNoActivityTimeout: 60000,
    singleRun: true,
    frameworks: ['mocha', 'chai-sinon'],
    files: [{
      pattern: filesPattern,
      watched: false
    }],
    preprocessors: {
      [filesPattern]: ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: {
                esModules: true
              }
            },
            exclude: /((node_modules)(\\|\/|$)|test\.js$)/
          }
        ]
      }
    },
    mochaReporter: {
      showDiff: true
    },
    reporters: ['mocha', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    }
  });
};
