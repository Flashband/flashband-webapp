'use strict';

var loginPage = require('../pages/login.page');

describe('The login view', function () {
  it('should visible required fields', function() {
    browser.get('#/login');

    expect(element(by.model('credencials.email')).isDisplayed()).toBeTruthy();
    expect(element(by.model('credencials.password')).isDisplayed()).toBeTruthy();
    expect(element(by.css('button[type="submit"]')).isDisplayed()).toBeTruthy();
  });

  it('should redirect to dashboard when authenticate successfully', function() {
    loginPage.tryAuthenticateSuccessfully();
    expect(browser.getCurrentUrl()).toContain('#/dashboard');
  });

  it('should view message error when authenticate fail', function() {
    loginPage.tryAuthenticateFail();
    expect(browser.getCurrentUrl()).toContain('#/login');

    var msg = element(by.className('alert-warning'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe('Usuário ou senha não conferem. Por favor, corrija e tente novamente.');
  });
});
