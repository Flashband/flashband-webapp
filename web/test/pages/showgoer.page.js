'use strict';

module.exports = {
  getInputName: function() {
    return element(by.model('showgoer.name'));
  },

  getInputDocNumber: function() {
    return element(by.model('showgoer.docNumber'));
  },

  getButtonSave: function() {
    return element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));
  },

  getDocOptionCpf: function() {
    var optionCpf = '1';
    return this.getDocOption(optionCpf);
  },

  getDocOptionRG: function() {
    var optionCpf = '2';
    return this.getDocOption(optionCpf);
  },

  getDocOptionPrompt: function() {
    var optionPrompt = '0';
    return this.getDocOption(optionPrompt);
  },

  getDocOption: function(option) {
    return element(by.css('select[ng-model="showgoer.docType"] option[value="' + option + '"]'));
  },

  saveNewShowGoerWithCPF: function(showGoerName, cpf) {
    this.getInputName().sendKeys(showGoerName);
    this.getDocOptionCpf().click();
    this.getInputDocNumber().sendKeys(cpf);
    this.getButtonSave().click();
    browser.waitForAngular();
  },

  saveNewShowGoerWithRG: function(showGoerName, rg) {
    this.getInputName().sendKeys(showGoerName);
    this.getDocOptionRG().click();
    this.getInputDocNumber().sendKeys(rg);
    this.getButtonSave().click();
    browser.waitForAngular();
  },

  goToNewShowGoerPage: function() {
    browser.get('#/showgoer/new');
  },

  goToSearchShowGoerPage: function() {
    browser.get('#/showgoer/search');
  }
};
