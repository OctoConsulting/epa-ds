/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.searchToggleButton = element(by.id('search-dropdown-toggle'));
  this.searchToggleText = element(by.binding('selectedSearchField'));
  this.searchDropDown = element(by.id('search-type-dropdown'));
  this.lastSearchField = this.searchDropDown.all(by.css('li')).last();
};

module.exports = new MainPage();
