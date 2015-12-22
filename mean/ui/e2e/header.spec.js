'use strict';

var testUtils = require("./e2eUtils.spec.js");

describe('The header', function () {
  var page;

  // make sure we are logged out
  browser.manage().deleteAllCookies();

  beforeEach(function () {
    browser.manage().window().setSize(1280, 1024);
    browser.get('/');
    page = require('./header.po');
  });

  it('notifications should be hidden if we are logged out', function() {
    expect(page.notificationDropdown.isDisplayed()).toBeFalsy();
  });

  afterEach(function () {
    expect(testUtils.consoleErrors()).toEqual([]);
  });
});
