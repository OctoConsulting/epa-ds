/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.email = element(by.model('email'));
  this.password = element(by.model('password'));
  this.loginButton = element(by.id('login-button'));
};

module.exports = new MainPage();
