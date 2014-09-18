'use strict';

var loginPage = require('../pages/login.page');

describe('The login view', function () {
  it('should visible required fields', function() {
    browser.get('#/login');
    browser.waitForAngular();

    expect(element(by.model('credencials.email')).isDisplayed()).toBeTruthy();
    expect(element(by.model('credencials.password')).isDisplayed()).toBeTruthy();
    expect(element(by.css('button[type="submit"]')).isDisplayed()).toBeTruthy();
  });

  it('should redirect to dashboard when authenticate successfully', function() {
    loginPage.setBrowser(browser).tryAuthenticateSuccessfully();
    expect(browser.getCurrentUrl()).toContain('#/dashboard');
  });

  it('should view message error when authenticate fail', function() {
    loginPage.setBrowser(browser).tryAuthenticateFail();
    expect(browser.getCurrentUrl()).toContain('#/login');

    var msg = element(by.css('div[translate="LOGIN.MESSAGE.ERROR"]'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe("Invalid credencials!");
  });
});
