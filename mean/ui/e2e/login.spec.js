'use strict';

var testUtils = require("./e2eUtils.spec.js");

describe('The login page', function () {
  var page;

  // make sure we are logged out
  browser.manage().deleteAllCookies();

  beforeEach(function () {
    browser.manage().window().setSize(1600, 1200);
  });

  it('should log in and redirect the user to the homepage', function() {
    browser.get('/#/login');
    page = require('./login.po');
    page.email.sendKeys('admin');
    page.password.sendKeys('admin');
    page.loginButton.click();
    var homeRegex = /\/?#\/?$/;
    browser.wait(testUtils.urlChangedTo(homeRegex), 5000);
    expect(browser.getCurrentUrl()).toMatch(homeRegex);
  });

  it('should set a cookie after logging in', function() {
    browser.manage().getCookie('token').then(function(cookie) {
      expect(cookie).toBeTruthy();
      expect(cookie.value).toBeTruthy();
    });
  });

  it('should log out, when clicking the log out button', function() {
    // TODO
  });

  afterEach(function () {
    expect(testUtils.consoleErrors()).toEqual([]);
  });
});
