'use strict';

module.exports = {
  setBrowser: function(browser) {
    this.browser = browser;
    return this;
  },

  tryAuthenticate: function(user, pass) {
    this.browser.get('#/login');
    this.browser.waitForAngular();

    element(by.model('credencials.email')).sendKeys(user);
    element(by.model('credencials.password')).sendKeys(pass);
    element(by.css('button[type="submit"]')).click();
    this.browser.waitForAngular();

    return this;
  },

  tryAuthenticateSuccessfully: function() {
    return this.tryAuthenticate("admin@flashband.com", "123123");
  },

  tryAuthenticateFail: function() {
    return this.tryAuthenticate("admin@flashband.com", "123123123123");
  }
};
