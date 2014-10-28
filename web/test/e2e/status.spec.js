'use strict';

var loginPage = require('../pages/login.page');

describe('Access Status View', function () {
  it('should have link to /status', function() {
    loginPage.tryAuthenticateSuccessfully();
    var linkToStatus = element(by.css('a[translate="FLASHBAND.MENU.STATUS"]'));
    linkToStatus.click();
    expect(browser.getCurrentUrl()).toContain('#/status');
  });

  it('should have title of page and list of showgoers', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/status');

    var pageTitle = element(by.css('h1[translate="FLASHBAND.STATUS.TEXT.TITLE"]'));
    var pageList = element(by.css('table#showgoers-list'));

    expect(pageTitle.isDisplayed()).toBeTruthy();
    expect(pageList.isDisplayed()).toBeTruthy();
    expect(pageTitle.getText()).toBe('Flashbands no evento (8)');

    element.all(by.css('tr')).then(function(arr) {
      expect(arr.length).toBeGreaterThan(1);
    });
  });
});
