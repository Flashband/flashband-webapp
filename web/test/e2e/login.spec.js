'use strict';

describe('The login view', function () {
  it('should visible required fields', function() {
    browser.get('#/login');
    browser.waitForAngular();

    expect(element(by.model('credencials.email')).isDisplayed()).toBeTruthy();
    expect(element(by.model('credencials.password')).isDisplayed()).toBeTruthy();
    expect(element(by.css('button[type="submit"]')).isDisplayed()).toBeTruthy();
  });

  var tryAuthenticate = function() {
    browser.get('#/login');
    browser.waitForAngular();

    element(by.model('credencials.email')).sendKeys("asd@asd.com");
    element(by.model('credencials.password')).sendKeys("123123");
    element(by.css('button[type="submit"]')).click();
    browser.waitForAngular();
  };

  it('should redirect to dashboard when authenticate successfully', function() {
    browser.mock('authenticate.valid');
    tryAuthenticate();
    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/#/dashboard');
  });

  it('should view message error when authenticate fail', function() {
    browser.mock('authenticate.invalid');
    tryAuthenticate();
    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/#/login');

    var msg = element(by.binding('messageError'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe("Invalid credencials!");
  });
});
