'use strict';

module.exports = {
  getInputName: function() {
    return element(by.model('showgoer.name'));
  },

  getInputSearch: function() {
    return element(by.model('showGoerSearch'));
  },

  getInputDocNumber: function() {
    return element(by.model('showgoer.docNumber'));
  },

  getButtonSave: function() {
    return element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));
  },

  getButtonSearch: function() {
    return element(by.css('button[translate=\'FLASHBAND.ASSOCIATE.BUTTON.SEARCH\']'));
  },

  getDocOptionCpf: function() {
    var optionCpf = '1';
    return this.getDocOption(optionCpf);
  },

  getDocOptionRG: function() {
    var optionCpf = '2';
    return this.getDocOption(optionCpf);
  },

  getDocOptionCNH: function() {
    var optionCpf = '3';
    return this.getDocOption(optionCpf);
  },

  getDocOptionPrompt: function() {
    var optionPrompt = '0';
    return this.getDocOption(optionPrompt);
  },

  getDocOption: function(option) {
    return element(by.css('select[ng-model="showgoer.docType"] option[value="' + option + '"]'));
  },

  saveNewShowGoerWithCNH: function(showGoerName, cnh) {
    this.getInputName().sendKeys(showGoerName);
    this.getDocOptionCNH().click();
    this.getInputDocNumber().sendKeys(cnh);
    this.getButtonSave().click();
    browser.waitForAngular();
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

  getFlashBandInput: function() {
    return element(by.model('flashbandTag'));
  },

  getAssociateButton: function() {
    return element(by.css('button[translate=\'FLASHBAND.ASSOCIATE.BUTTON.ASSOCIATE\']'));
  },

  saveAssociationWithFlashBand: function(validFlashBand) {
    this.getFlashBandInput().sendKeys(validFlashBand);
    this.getAssociateButton().click();
    browser.waitForAngular();
  },

  selectFirstShowGoer: function() {
    var trShowGoer = element(by.repeater('sg in listShowgoers').row(0));
    var elRadioSelection = trShowGoer.element(by.css('input'));
    elRadioSelection.click();
    browser.waitForAngular();
    return elRadioSelection;
  },

  goToNewShowGoerPage: function() {
    browser.get('#/showgoer/new');
  },

  goToSearchShowGoerPage: function() {
    browser.get('#/showgoer/search');
  },

  searchShowGoer: function(arg) {
    this.getInputSearch().sendKeys(arg);
    this.getButtonSearch().click();
    browser.waitForAngular();
  }
};
