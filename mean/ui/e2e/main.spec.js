'use strict';

var testUtils = require("./e2eUtils.spec.js");

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('/');
    page = require('./main.po');
  });

  it('should set a default search field', function() {
    expect(page.searchToggleText.getText()).toBe('All fields');
  });

  it('should update the search type field', function() {
    expect(page.searchDropDown.isDisplayed()).toBeFalsy();
    page.searchToggleButton.click();
    expect(page.searchDropDown.isDisplayed()).toBeTruthy();
    var lastText = page.lastSearchField.getText();
    page.lastSearchField.click();
    expect(page.searchDropDown.isDisplayed()).toBeFalsy();
    expect(page.searchToggleText.getText()).toBe(lastText);
  });

  afterEach(function () {
    expect(testUtils.consoleErrors()).toEqual([]);
  });
});
