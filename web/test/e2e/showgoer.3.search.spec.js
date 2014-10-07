'use strict';

var loginPage = require('../pages/login.page');

describe('Search ShowGoer View', function () {
  it('should contains help message', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/search');

    var pageTitle = element(by.css('h1[translate=\'FLASHBAND.ASSOCIATE.TEXT.TITLE\']'));
    var pageText = element(by.css('p[translate=\'FLASHBAND.ASSOCIATE.TEXT.NEW\']'));
    var pageSearchButton = element(by.css('button[translate=\'FLASHBAND.ASSOCIATE.BUTTON.SEARCH\']'));
    var pageShowGoerSearchInput = element(by.model('showGoerSearch'));
    var pageCancelButton = element(by.css('a[translate=\'FLASHBAND.ASSOCIATE.BUTTON.CANCEL\']'));
    var pageAssociateButton = element(by.css('button[translate=\'FLASHBAND.ASSOCIATE.BUTTON.ASSOCIATE\']'));
    var msgNewShowGoer = element(by.className('new-showgoer-message'));

    expect(msgNewShowGoer.isDisplayed()).toBeFalsy();
    expect(pageTitle.isDisplayed()).toBeTruthy();
    expect(pageText.isDisplayed()).toBeTruthy();
    expect(pageCancelButton.isDisplayed()).toBeTruthy();
    expect(pageSearchButton.isDisplayed()).toBeTruthy();
    expect(pageShowGoerSearchInput.isDisplayed()).toBeTruthy();
    expect(pageAssociateButton.isDisplayed()).toBeTruthy();

    expect(pageTitle.getText()).toBe('Vincular ShowGoer');
    expect(pageText.getText()).toBe('Para vincular um ShowGoer a uma pulseira, basta buscar pelo nome ou número do documento cadastrado. Depois é só clicar em vincular e aproximar a pulseira do leitor.');
    expect(pageSearchButton.getText()).toBe('buscar');
    expect(pageCancelButton.getText()).toBe('Cancelar');
    expect(pageAssociateButton.getText()).toBe('Vincular');
  });

  it('should find by name ShowGoer before associating', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    var pageNameInput = element(by.model('showgoer.name'));
    var pageDocNumberInput = element(by.model('showgoer.docNumber'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));
    var pageDocTypeCpfOption = element(by.css('select[ng-model="showgoer.docType"] option[value="1"]'));

    var showGoerName = 'ShowGoer com CPF para Vinculação';
    var showGoerCPF = '999.000.222-22';

    pageNameInput.sendKeys(showGoerName);
    pageDocTypeCpfOption.click();
    pageDocNumberInput.sendKeys(showGoerCPF);
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
    var elShowGoerDocType = trShowGoer.element(by.binding('sg.docType'));
    var elShowGoerDocNumber = trShowGoer.element(by.binding('sg.docNumber'));

    expect(elShowGoerName.getText()).toBe(showGoerName);
    expect(elShowGoerDocType.getText()).toBe('CPF');
    expect(elShowGoerDocNumber.getText()).toBe(showGoerCPF);
  });

  it('should redirect to view associate after selecting user', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    var pageNameInput = element(by.model('showgoer.name'));
    var pageDocNumberInput = element(by.model('showgoer.docNumber'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));
    var pageDocTypeRgOption = element(by.css('select[ng-model="showgoer.docType"] option[value="2"]'));

    var showGoerName = 'Showoger com RG para Vinculação';
    var showGoerRG = '555.777.111-33';

    pageNameInput.sendKeys(showGoerName);
    pageDocTypeRgOption.click();
    pageDocNumberInput.sendKeys(showGoerRG);
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
    var elRadioSelection = trShowGoer.element(by.css('input'));
    elRadioSelection.click();
    browser.waitForAngular();

    var pageAssociateButton = element(by.css('button[translate=\'FLASHBAND.ASSOCIATE.BUTTON.ASSOCIATE\']'));

    elRadioSelection.getAttribute('value').then(function(showGoerId) {
      pageAssociateButton.click();
      browser.waitForAngular();

      expect(browser.getCurrentUrl()).toContain('#/showgoer/'.concat(showGoerId, '/associate'));

      var msg = element(by.className('alert-success'));
      expect(msg.isDisplayed()).toBeTruthy();
      expect(msg.getText()).toBe('ShowGoer vinculado com sucesso.');
    });
  });

  it('should reject associations already associated to showgoer.', function () {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    var pageNameInput = element(by.model('showgoer.name'));
    var pageDocNumberInput = element(by.model('showgoer.docNumber'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));
    var pageDocTypeCNHOption = element(by.css('select[ng-model="showgoer.docType"] option[value="3"]'));

    var showGoerName = 'Showoger com carteira de motorista para Vinculação';
    var showGoerCNH = '555.444.222.111';

    pageNameInput.sendKeys(showGoerName);
    pageDocTypeCNHOption.click();
    pageDocNumberInput.sendKeys(showGoerCNH);
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
    var elRadioSelection = trShowGoer.element(by.css('input'));
    elRadioSelection.click();
    browser.waitForAngular();

    var pageAssociateButton = element(by.css('button[translate=\'FLASHBAND.ASSOCIATE.BUTTON.ASSOCIATE\']'));
    pageAssociateButton.click();
    browser.waitForAngular();

    linkToAssociateShowGoer.click();
    browser.waitForAngular();

    pageShowGoerSearchInput.sendKeys(showGoerName);
    pageSearchButton.click();
    browser.waitForAngular();

    elRadioSelection.click();
    browser.waitForAngular();

    var msg = element(by.className('alert-warning'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe('Opa, esse ShowGoer já foi vinculado a uma pulseira.');
  });

  it('should view message of new showgoer when not found for association', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/search');

    var pageShowGoerSearchInput = element(by.model('showGoerSearch'));
    var pageSearchButton = element(by.css('button[translate=\'FLASHBAND.ASSOCIATE.BUTTON.SEARCH\']'));

    pageShowGoerSearchInput.sendKeys("Invalid ShowGoer");
    pageSearchButton.click();
    browser.waitForAngular();

    var msgNewShowGoer = element(by.className('new-showgoer-message'));
    expect(msgNewShowGoer.isDisplayed()).toBeTruthy();
    expect(msgNewShowGoer.getText()).toContain('Não existem visitantes cadastrados com esse nome ou documento.');

    var linkNewShowGoer = element(by.css('a[ui-sref=\'showgoer-new\']'));
    linkNewShowGoer.click();
    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toContain('#/showgoer/new');
  });
});
