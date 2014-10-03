'use strict';

var loginPage = require('../pages/login.page');

describe('The new Showgoer view', function () {
  it('should contains welcome message', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    var pageTitle = element(by.css('h1[translate="FLASHBAND.SHOWGOER.TEXT.TITLE"]'));
    var pageText = element(by.css('p[translate="FLASHBAND.SHOWGOER.TEXT.NEW"]'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));
    var pageCancelButton = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON.CANCEL"]'));
    var pageNameInput = element(by.model('showgoer.name'));
    var pageDocTypeSelect = element(by.model('showgoer.doctype'));
    var pageDocTypeOptions = element.all(by.options('doc.type as (doc.name|translate) for doc in docTypes'));

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
    var pageDocTypeCpfOption = element(by.css('select[ng-model="showgoer.doctype"] option[value="1"]'));

    pageDocTypeCpfOption.click();
    browser.waitForAngular();

    pageDocTypePromptOption.click();
    browser.waitForAngular();

    pageDocTypePromptOption = element(by.css('select[ng-model="showgoer.doctype"] option:checked'));

    expect(pageDocTypePromptOption.getText()).toBe("Selecione o documento");
  });

  it('should save showgoer when valid input', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    var pageNameInput = element(by.model('showgoer.name'));
    var pageDocNumberInput = element(by.model('showgoer.docnumber'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));
    var pageDocTypeCpfOption = element(by.css('select[ng-model="showgoer.doctype"] option[value="1"]'));

    pageNameInput.sendKeys('Fulano de Tal');
    pageDocTypeCpfOption.click();
    pageDocNumberInput.sendKeys('000.000.000-00');
    pageSaveButton.click();
    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toContain('#/showgoer');

    var msg = element(by.className('alert-success'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe("Showgoer cadastrado com sucesso.");
  });

  it('validate required fields', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));

    pageSaveButton.click();
    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toContain('#/showgoer/new');

    var msg = element(by.className('alert-warning'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe("Todos os campso são obrigatórios. Verifique e tente novamente.");
  });

  it('validate required showgoer document number is required when displayed', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    var pageNameInput = element(by.model('showgoer.name'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));
    var pageDocTypeCpfOption = element(by.css('select[ng-model="showgoer.doctype"] option[value="1"]'));

    pageNameInput.sendKeys('Fulano de Tal');
    pageDocTypeCpfOption.click();
    pageSaveButton.click();

    expect(browser.getCurrentUrl()).toContain('#/showgoer/new');

    var msg = element(by.className('alert-warning'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe("Todos os campso são obrigatórios. Verifique e tente novamente.");
  });

  it('should not register duplicated showgoer', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');
    
    var pageNameInput = element(by.model('showgoer.name'));
    var pageDocNumberInput = element(by.model('showgoer.docnumber'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));
    var pageDocTypeCpfOption = element(by.css('select[ng-model="showgoer.doctype"] option[value="1"]'));

    pageNameInput.sendKeys('Fulano de Tal');
    pageDocTypeCpfOption.click();
    pageDocNumberInput.sendKeys('000.000.000-00');
    pageSaveButton.click();
    browser.waitForAngular();

    browser.get('#/showgoer/new');

    pageNameInput = element(by.model('showgoer.name'));
    pageDocNumberInput = element(by.model('showgoer.docnumber'));
    pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));
    pageDocTypeCpfOption = element(by.css('select[ng-model="showgoer.doctype"] option[value="1"]'));

    pageNameInput.sendKeys('Beltrano de Tal');
    pageDocTypeCpfOption.click();
    pageDocNumberInput.sendKeys('000.000.000-00');
    pageSaveButton.click();
    browser.waitForAngular();

    var msg = element(by.className('alert-warning'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe('Opa, esse documento já está cadastrado. Talvez você tenha errado o número. Corrija ou cadastre outro Showgoer.');
  });

  it('should display message and associate flashband button', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer/new');

    var pageNameInput = element(by.model('showgoer.name'));
    var pageDocNumberInput = element(by.model('showgoer.docnumber'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));
    var pageDocTypeCpfOption = element(by.css('select[ng-model="showgoer.doctype"] option[value="1"]'));

    pageNameInput.sendKeys('Fulano de Tal');
    pageDocTypeCpfOption.click();
    pageDocNumberInput.sendKeys('222.2202.222-22');
    pageSaveButton.click();
    browser.waitForAngular();

    var linkToNewShowgoer = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON.NEW"]'));
    linkToNewShowgoer.click();
    browser.waitForAngular();

    pageNameInput.sendKeys('Beltrano de Tal');
    pageDocTypeCpfOption.click();
    pageDocNumberInput.sendKeys('111.111.111-11');
    pageSaveButton.click();
    browser.waitForAngular();

    var pageTextStart = element(by.css('p[translate="FLASHBAND.SHOWGOER.TEXT.START"]'));
    var pageTextCreated = element(by.css('p[translate="FLASHBAND.SHOWGOER.TEXT.CREATED"]'));
    var pageButtonNew = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON.NEW"]'));
    var pageButtonAssociate = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON.ASSOCIATE"]'));

    expect(pageTextStart.isDisplayed()).toBeFalsy();
    expect(pageTextCreated.isDisplayed()).toBeTruthy();

    expect(pageButtonNew.isDisplayed()).toBeTruthy();
    expect(pageButtonAssociate.isDisplayed()).toBeTruthy();

    expect(pageTextCreated.getText()).toBe("Você possui 3 shogowers cadastrados. Para adicionar um novo showgoer, é só clicar em cadastrar showgoer. Para vincular um showgoer cadastrado a uma pulseira, é só clicar em vincular showgoer.");
    expect(pageButtonAssociate.getText()).toBe("Vincular showgoer");
  });
});
