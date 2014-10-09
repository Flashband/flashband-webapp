'use strict';

var loginPage = require('../pages/login.page');
var showGoerPage = require('../pages/showgoer.page');
var showGoerValidName, showGoerValidCPF;

describe('New ShowGoer View', function () {
  beforeEach(function() {
    loginPage.tryAuthenticateSuccessfully();
    showGoerPage.goToNewShowGoerPage();

    showGoerValidName = 'Faluna de Tal';
    showGoerValidCPF  = showGoerValidCPF;
  });

  it('should contains welcome message', function() {
    var pageNameInput = showGoerPage.getInputName();
    var pageTitle = element(by.css('h1[translate="FLASHBAND.SHOWGOER.TEXT.TITLE"]'));
    var pageText = element(by.css('p[translate="FLASHBAND.SHOWGOER.TEXT.NEW"]'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));
    var pageCancelButton = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON.CANCEL"]'));

    var pageDocTypeSelect = element(by.model('showgoer.docType'));
    var pageDocTypeOptions = element.all(by.options('doc.type as (doc.name|translate) for doc in docTypes'));

    expect(pageTitle.isDisplayed()).toBeTruthy();
    expect(pageText.isDisplayed()).toBeTruthy();
    expect(pageSaveButton.isDisplayed()).toBeTruthy();
    expect(pageCancelButton.isDisplayed()).toBeTruthy();
    expect(pageNameInput.isDisplayed()).toBeTruthy();
    expect(pageDocTypeSelect.isDisplayed()).toBeTruthy();
    expect(pageDocTypeOptions.first().isSelected()).toBeTruthy();

    expect(pageTitle.getText()).toBe('Cadastre um ShowGoer');
    expect(pageText.getText()).toBe('Para começar, basta informar o nome do ShowGoer. Depois escolha o tipo de documento e informe o número do documento.');
    expect(pageDocTypeOptions.first().getText()).toBe('Selecione o documento');
    expect(pageSaveButton.getText()).toBe('Cadastrar');
    expect(pageCancelButton.getText()).toBe('Cancelar');
  });

  it('should display document number input when document type is selected', function() {
    var pageDocNumberInput = showGoerPage.getInputDocNumber();
    var pageDocTypeCpfOption = showGoerPage.getDocOptionCpf();
    expect(pageDocNumberInput.isDisplayed()).toBeFalsy();
    pageDocTypeCpfOption.click();
    expect(pageDocNumberInput.isDisplayed()).toBeTruthy();
  });

  it('should not add an empty docType option when a docType is selected and then return to default prompt option', function() {
    var pageDocTypeCpfOption = showGoerPage.getDocOptionCpf();
    var pageDocTypePromptOption = showGoerPage.getDocOptionPrompt();

    pageDocTypeCpfOption.click();
    browser.waitForAngular();

    pageDocTypePromptOption.click();
    browser.waitForAngular();

    pageDocTypePromptOption = element(by.css('select[ng-model="showgoer.docType"] option:checked'));
    expect(pageDocTypePromptOption.getText()).toBe('Selecione o documento');
  });

  it('should save ShowGoer when valid input', function() {
    showGoerPage.saveNewShowGoerWithCPF(showGoerValidName, showGoerValidCPF);
    expect(browser.getCurrentUrl()).toContain('#/showgoer');
    var msg = element(by.className('alert-success'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe('ShowGoer cadastrado com sucesso.');
  });

  it('validate required fields', function() {
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.SHOWGOER.BUTTON.SAVE"]'));

    pageSaveButton.click();
    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toContain('#/showgoer/new');

    var msg = element(by.className('alert-warning'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe('Todos os campos são obrigatórios. Verifique e tente novamente.');
  });

  it('validate required ShowGoer document number is required when displayed', function() {
    showGoerPage.saveNewShowGoerWithCPF(showGoerValidName, '');
    expect(browser.getCurrentUrl()).toContain('#/showgoer/new');

    var msg = element(by.className('alert-warning'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe('Todos os campos são obrigatórios. Verifique e tente novamente.');
  });

  it('should not register duplicated ShowGoer', function() {
    showGoerPage.saveNewShowGoerWithCPF(showGoerValidName, showGoerValidCPF);

    showGoerPage.goToNewShowGoerPage();
    showGoerPage.saveNewShowGoerWithCPF('Beltrano de Tal', showGoerValidCPF);

    var msg = element(by.className('alert-warning'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe('Opa, esse documento já está cadastrado. Talvez você tenha errado o número. Corrija ou cadastre outro ShowGoer.');
  });

  it('should display message and associate flashband button', function() {
    showGoerPage.saveNewShowGoerWithCPF(showGoerValidName, '222.333.444-55');

    var linkToNewShowGoer = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON.NEW"]'));
    linkToNewShowGoer.click();
    browser.waitForAngular();

    showGoerPage.saveNewShowGoerWithCPF('Beltrano de Tal', '444.333.444-11');

    var pageTextStart = element(by.css('p[translate=\'FLASHBAND.SHOWGOER.TEXT.START\']'));
    var pageTextCreated = element(by.css('p[translate=\'FLASHBAND.SHOWGOER.TEXT.CREATED\']'));
    var pageButtonNew = element(by.css('a[translate=\'FLASHBAND.SHOWGOER.BUTTON.NEW\']'));
    var pageButtonAssociate = element(by.css('a[translate=\'FLASHBAND.SHOWGOER.BUTTON.ASSOCIATE\']'));

    expect(pageTextStart.isDisplayed()).toBeFalsy();
    expect(pageTextCreated.isDisplayed()).toBeTruthy();

    expect(pageButtonNew.isDisplayed()).toBeTruthy();
    expect(pageButtonAssociate.isDisplayed()).toBeTruthy();

    expect(pageTextCreated.getText()).toBe('Você possui 3 ShowGoers cadastrados. Para adicionar um novo ShowGoer, é só clicar em cadastrar ShowGoer. Para vincular um ShowGoer cadastrado a uma pulseira, é só clicar em vincular ShowGoer.');
    expect(pageButtonAssociate.getText()).toBe('Vincular ShowGoer');
  });
});
