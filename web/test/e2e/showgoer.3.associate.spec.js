'use strict';

var loginPage = require('../pages/login.page');

describe('The Associate ShowGoers view', function () {
  it('should contains help message', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/associate/search');

    var pageTitle = element(by.css('h1[translate=\'FLASHBAND.ASSOCIATE.TEXT.TITLE\']'));
    var pageText = element(by.css('p[translate=\'FLASHBAND.ASSOCIATE.TEXT.NEW\']'));
    var pageSaveButton = element(by.css('button[translate=\'FLASHBAND.ASSOCIATE.BUTTON.ASSOCIATE\']'));
    var pageSearchButton = element(by.css('button[translate=\'FLASHBAND.ASSOCIATE.BUTTON.SEARCH\']'));
    var pageCancelButton = element(by.css('a[translate=\'FLASHBAND.ASSOCIATE.BUTTON.CANCEL\']'));
    var pageShowGoerInput = element(by.model('showGoerSearch'));

    expect(pageTitle.isDisplayed()).toBeTruthy();
    expect(pageText.isDisplayed()).toBeTruthy();
    expect(pageSaveButton.isDisplayed()).toBeTruthy();
    expect(pageCancelButton.isDisplayed()).toBeTruthy();
    expect(pageSearchButton.isDisplayed()).toBeTruthy();
    expect(pageShowGoerInput.isDisplayed()).toBeTruthy();

    expect(pageTitle.getText()).toBe('Vincular ShowGoer');
    expect(pageText.getText()).toBe('Para Vincular um ShowGoer a uma pulseira, basta buscar pelo nome ou número do documento cadastrado. Depois é só clicar em vincular e aproximar a pulseira do leitor.');
    expect(pageSaveButton.getText()).toBe('Vincular');
    expect(pageSearchButton.getText()).toBe('buscar');
    expect(pageCancelButton.getText()).toBe('Cancelar');
  });

  it('should find by name ShowGoer before associating', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    var pageNameInput = element(by.model('showgoer.name'));
    var pageDocNumberInput = element(by.model('showgoer.docnumber'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));
    var pageDocTypeCpfOption = element(by.css('select[ng-model="showgoer.doctype"] option[value="1"]'));
    var showGoerName = 'Showoger para Vinculação';

    pageNameInput.sendKeys(showGoerName);
    pageDocTypeCpfOption.click();
    pageDocNumberInput.sendKeys('999.000.222-22');
    pageSaveButton.click();
    browser.waitForAngular();

    var linkToAssociateShowGoer = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON.ASSOCIATE"]'));
    linkToAssociateShowGoer.click();
    browser.waitForAngular();

    var pageShowGoerSearchInput = element(by.model('showGoerSearch'));
    pageShowGoerSearchInput.sendKeys(showGoerName);

    var pageSearchButton = element(by.css('button[translate=\'FLASHBAND.ASSOCIATE.BUTTON.SEARCH\']'));
    pageSearchButton.click();
    browser.waitForAngular();

    var trShowGoer = element(by.repeater('sg in listShowgoers').row(0));
    var elShowGoerName = trShowGoer.element(by.binding('sg.name'));

    expect(elShowGoerName.getText()).toBe(showGoerName);
  });
});
