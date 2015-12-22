/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var Header = function() {
  this.notificationBell = element(by.id('notification-bell')).element(by.css('a'));
  this.notificationDropdown = element(by.id('notification-dropdown'));
};

module.exports = new Header();
/**
 * Created by jbabbs on 8/27/2015.
 */
