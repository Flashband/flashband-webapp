'use strict';

var loginPage = require('./login.page');

module.exports = {
  goEnableFlashbands: function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/enable-flashbands');
  },

  goUploadFlashbands: function() {
    this.goEnableFlashbands();
    browser.get('#/flashbands-upload');
  }
};
