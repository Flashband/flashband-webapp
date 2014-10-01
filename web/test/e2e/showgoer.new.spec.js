'use strict';

var loginPage = require('../pages/login.page');

describe('The new Showgoer view', function () {
  it('should contains welcome message', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    var pageTitle = element(by.css('h1[translate="FLASHBAND.SHOWGOER.TITLE"]'));
    var pageText = element(by.css('p[translate="FLASHBAND.SHOWGOER.NEW"]'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.SAVE"]'));
    var pageCancelButton = element(by.css('a[translate="FLASHBAND.SHOWGOER.CANCEL"]'));
    var pageNameInput = element(by.model('showgoer.name'));
    var pageDocTypeSelect = element(by.model('showgoer.doctype'));
    var pageDocTypeOptions = element.all(by.options('doc.type as doc.name for doc in docTypes'));

    expect(pageTitle.isDisplayed()).toBeTruthy();
    expect(pageText.isDisplayed()).toBeTruthy();
    expect(pageSaveButton.isDisplayed()).toBeTruthy();
    expect(pageCancelButton.isDisplayed()).toBeTruthy();
    expect(pageNameInput.isDisplayed()).toBeTruthy();
    expect(pageDocTypeSelect.isDisplayed()).toBeTruthy();
    expect(pageDocTypeOptions.first().isSelected()).toBeTruthy();

    expect(pageTitle.getText()).toBe("Cadastre um showgoer");
    expect(pageText.getText()).toBe("Para começar, basta informar o nome do showgoer. Depois escolha o tipo de documento e informe o número do documento.");
    expect(pageDocTypeOptions.first().getText()).toBe("Selecione o documento");
    expect(pageSaveButton.getText()).toBe("Cadastrar");
    expect(pageCancelButton.getText()).toBe("Cancelar");
  });
  it('should display document number input when document type is selected', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    var pageDocNumberInput = element(by.model('showgoer.docnumber'));
    var pageDocTypeCpfOption = element(by.css('select[ng-model="showgoer.doctype"] option[value="1"]'));

    expect(pageDocNumberInput.isDisplayed()).toBeFalsy();

    pageDocTypeCpfOption.click();


    expect(pageDocNumberInput.isDisplayed()).toBeTruthy();
  });
  it('should not add an empty docType option when a docType is selected and then return to default prompt option', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    var pageDocTypePromptOption = element(by.css('select[ng-model="showgoer.doctype"] option[value="0"]'));
    var inicialText = pageDocTypePromptOption.getText();
    var pageDocTypeCpfOption = element(by.css('select[ng-model="showgoer.doctype"] option[value="1"]'));

    pageDocTypeCpfOption.click();
    pageDocTypePromptOption.click();

    pageDocTypePromptOption = element(by.css('select[ng-model="showgoer.doctype"] option:checked'));

    expect(pageDocTypePromptOption.getText()).toBe("Selecione o documento");
  });

  it('should save showgoer when valid input', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    
    var pageNameInput = element(by.model('showgoer.name'));
    var pageDocNumberInput = element(by.model('showgoer.docnumber'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.SAVE"]'));
    var pageDocTypeCpfOption = element(by.css('select[ng-model="showgoer.doctype"] option[value="1"]'));

    pageNameInput.sendKeys('Fulano de Tal');
    pageDocTypeCpfOption.click();
    pageDocNumberInput.sendKeys('000.000.000-00');
    pageSaveButton.click();


    expect(browser.getCurrentUrl()).toContain('#/showgoer');

    var msg = element(by.className('alert-success'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe("Showgoer cadastrado com sucesso.");
  });

  it('validate required fields', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    
    var pageNameInput = element(by.model('showgoer.name'));
    var pageDocNumberInput = element(by.model('showgoer.docnumber'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.SAVE"]'));
    var pageDocTypeCpfOption = element(by.css('select[ng-model="showgoer.doctype"] option[value="1"]'));

    pageSaveButton.click();

    expect(browser.getCurrentUrl()).toContain('#/showgoer/new');

    var msg = element(by.className('alert-warning'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe("Todos os campso são obrigatórios. Verifique e tente novamente.");
  });

  it('validate required showgoer document number is required when displayed', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    
    var pageNameInput = element(by.model('showgoer.name'));
    var pageDocNumberInput = element(by.model('showgoer.docnumber'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.SAVE"]'));
    var pageDocTypeCpfOption = element(by.css('select[ng-model="showgoer.doctype"] option[value="1"]'));

    pageNameInput.sendKeys('Fulano de Tal');
    pageDocTypeCpfOption.click();
    pageSaveButton.click();

    expect(browser.getCurrentUrl()).toContain('#/showgoer/new');

    var msg = element(by.className('alert-warning'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe("Todos os campso são obrigatórios. Verifique e tente novamente.");
  });
});
