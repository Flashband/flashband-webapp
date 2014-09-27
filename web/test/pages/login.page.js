'use strict';

module.exports = {
  tryAuthenticate: function(user, pass) {
    browser.get('#/login');

    element(by.model('credencials.email')).sendKeys(user);
    element(by.model('credencials.password')).sendKeys(pass);
    element(by.css('button[type="submit"]')).click();
    browser.waitForAngular();

    return this;
  },

  tryAuthenticateSuccessfully: function() {
    return this.tryAuthenticate("admin@flashband.com", "123123");
  },

  tryAuthenticateFail: function() {
    return this.tryAuthenticate("admin@flashband.com", "123123123123");
  }
};
