'use strict';

var tryAuthenticate = function(mock) {
  browser.mock(mock);
  browser.get('#/login');
  browser.waitForAngular();

  element(by.model('credencials.email')).sendKeys("user@temp.lcc");
  element(by.model('credencials.password')).sendKeys("123123");
  element(by.css('button[type="submit"]')).click();
  browser.waitForAngular();
};

describe('The login view', function () {
  it('should visible required fields', function() {
    browser.get('#/login');
    browser.waitForAngular();

    expect(element(by.model('credencials.email')).isDisplayed()).toBeTruthy();
    expect(element(by.model('credencials.password')).isDisplayed()).toBeTruthy();
    expect(element(by.css('button[type="submit"]')).isDisplayed()).toBeTruthy();
  });

  it('should redirect to dashboard when authenticate successfully', function() {
    tryAuthenticate('authenticate.valid');
    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/#/dashboard');
  });

  it('should view message error when authenticate fail', function() {
    tryAuthenticate('authenticate.invalid');
    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/#/login');

    var msg = element(by.binding('messageError'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe("Invalid credencials!");
  });
});
