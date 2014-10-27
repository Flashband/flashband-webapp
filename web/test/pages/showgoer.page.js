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

  getFlashBandInput: function() {
    return element(by.model('flashbandTag'));
  },

  getAssociateButton: function() {
    return element(by.css('button[translate=\'FLASHBAND.ASSOCIATE.BUTTON.ASSOCIATE\']'));
  },

  saveNewShowGoerWithCNH: function(showGoerName, cnh) {
    this.getInputName().sendKeys(showGoerName);
    this.getDocOptionCNH().click();
    this.getInputDocNumber().sendKeys(cnh);
    this.getButtonSave().click();
    browser.waitForAngular();
    return this;
  },

  saveNewShowGoerWithCPF: function(showGoerName, cpf) {
    this.getInputName().sendKeys(showGoerName);
    this.getDocOptionCpf().click();
    this.getInputDocNumber().sendKeys(cpf);
    this.getButtonSave().click();
    browser.waitForAngular();
    return this;
  },

  saveNewShowGoerWithRG: function(showGoerName, rg) {
    this.getInputName().sendKeys(showGoerName);
    this.getDocOptionRG().click();
    this.getInputDocNumber().sendKeys(rg);
    this.getButtonSave().click();
    browser.waitForAngular();
    return this;
  },

  saveAssociationWithFlashBand: function(validFlashBand) {
    this.getFlashBandInput().sendKeys(validFlashBand);
    this.getAssociateButton().click();
    browser.waitForAngular();
    return this;
  },

  saveAssociationWithoutFlashBand: function() {
    this.getAssociateButton().click();
    browser.waitForAngular();
    return this;
  },

  selectFirstShowGoer: function() {
    var trShowGoer = element(by.repeater('sg in listShowgoers').row(0));
    var elRadioSelection = trShowGoer.element(by.css('input'));
    elRadioSelection.click();
    browser.waitForAngular();
    return elRadioSelection.getAttribute('value');
  },

  goToNewShowGoerPage: function() {
    browser.get('#/showgoer/new');
    return this;
  },

  goToSearchShowGoerPage: function() {
    browser.get('#/showgoer/search');
    return this;
  },

  searchShowGoer: function(arg) {
    this.getInputSearch().sendKeys(arg);
    this.getButtonSearch().click();
    browser.waitForAngular();
    return this;
  },

  expectAlertWarning: function(message) {
    return this.expectAlert('warning', message);
  },

  expectAlertSuccess: function(message) {
    return this.expectAlert('success', message);
  },

  expectAlert: function(type, message) {
    var msg = element(by.className('alert-'.concat(type)));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe(message);
    return this;
  },

  expectShowgoerAssociated: function(showGoerId) {
    expect(browser.getCurrentUrl()).toContain('#/showgoer/'.concat(showGoerId, '/associate'));
    this.expectAlertSuccess('Visitante vinculado com sucesso.');
    return this;
  },

  expectUrlPageNew: function() {
    expect(browser.getCurrentUrl()).toContain('#/showgoer/new');
    return this;
  },

  expectUrlPageStart: function() {
    expect(browser.getCurrentUrl()).toContain('#/showgoer');
    return this;
  },

  expectEmptyInputTag: function() {
    var flashbandTag = element(by.model('flashbandTag'));
    expect(flashbandTag.getAttribute('value')).toBe('');
  },
};
