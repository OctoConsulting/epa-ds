module.exports = {
  // Returns uncaught exceptions that appear in the console, only those exception classes that end with 'Error'.
  // e.g.
  //    throw "StringError": would not be caught, because the class name of the thrown object is String, not *Error
  //    throw new CustomError('An error'): would be caught
  //    JSON.parse('{{'): would be caught, because it throws a ParseError
  consoleErrors: function() {
    var deferred = protractor.promise.defer();

    this.browserName().then(function(bname) {
      var errors = [];

      if (bname === 'internet explorer') {
        deferred.fulfill([]); // internet explorer does not allow browser.manage().logs()
      } else {
        browser.manage().logs().get('browser').then(function (browserLog) {
          browserLog.forEach(function(log) {
            if (log.message.match(/\s*\w*Error:/m) || log.level.name === 'SEVERE') {
              errors.push(log);
            }
          });
          deferred.fulfill(errors);
        });
      }
    });
    return deferred.promise;
  },
  browserName: function() {
    var deferred = protractor.promise.defer();
    browser.getCapabilities().then(function(caps) {
      deferred.fulfill(caps.caps_.browserName);
    });
    return deferred.promise;
  },
  hasClass: function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
    });
  },
  urlChangedTo: function(urlRegex) {
    return function () {
      return browser.getCurrentUrl().then(function(actualUrl) {
        return actualUrl.match(urlRegex);
      });
    };
  }
};
