'use strict';

var loginPage = require('./login.page');

module.exports = {
  setBrowser: function(browser) {
    this.browser = browser;
    return this;
  },

  goEnableFlashbands: function() {
    loginPage.setBrowser(this.browser).tryAuthenticateSuccessfully();
    this.browser.get('#/enable-flashbands');
    this.browser.waitForAngular();
  }
};
