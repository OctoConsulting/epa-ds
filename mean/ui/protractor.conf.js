'use strict';

var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;
var minimist = require('minimist');

// jbabbs: On my machine, chrome only works for me if the browser if closed before running the tests
var chromeCaps = {
  browserName: 'chrome',
  loggingPrefs: { browser: "WARNING" }
};

var phantomjsCaps = {
  browserName: 'phantomjs',
  'phantomjs.ghostdriver.cli.args': ['--loglevel=WARNING'],
  'phantomjs.binary.path': require('phantomjs').path
};

var ieCaps = {
  browserName: 'ie',
  loggingPrefs: { browser: "WARNING" },
  //version: '9'
};

var ffCaps = {
  /* jbabbs: Firefox fails to wait for console output, before checking browser logs. As a result, the test case
   * are unable to detect
   */
    browserName: 'firefox',
    loggingPrefs: { browser: "WARNING" }
};

var baselineConfig = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

  //maxSessions: 1, // sometimes protractor has issues running multiple browsers in parrellel, uncomment if that is the case
  baseUrl: 'http://127.0.0.1:3000',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [paths.e2e + '/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};

// filter out the first 3 args (node.exe, protractor, {conf file}) and use minimist to get the args in a manageable form
var args = minimist(process.argv.slice(3));

// If browser={browsername} was specified on the command line
if (args.browser) {
  switch (args.browser) {
    case 'chrome':
      baselineConfig.capabilities = chromeCaps;
      break;
    case 'phantomjs':
      baselineConfig.capabilities = phantomjsCaps;
      break;
    case 'ie':
      baselineConfig.capabilities = ieCaps;
      break;
    case 'firefox':
      baselineConfig.capabilities = ffCaps;
      break;
    default:
      console.log('unrecognized browser: ' + args.browser);
      process.exit(1);
  }
} else {
  // firefox starts first, but probably finishes tests last
  baselineConfig.multiCapabilities = [ffCaps, ieCaps, chromeCaps];
}

// An example configuration file.
exports.config = baselineConfig;
