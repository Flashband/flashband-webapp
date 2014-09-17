exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    'browserName': 'phantomjs',
  },

  baseUrl: 'http://localhost:3000',
  //rootElement: 'body',
  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['test/e2e/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    // onComplete will be called just before the driver quits.
    onComplete: null,
    // If true, display spec names.
    isVerbose: true,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 10000
  },

  onPrepare: function () {
    browser.mock = function (name) {
      browser.clearMockModules();
      browser.addMockModule(name, require('./mocks/'.concat(name)).registerMock)
    }
  }
};
