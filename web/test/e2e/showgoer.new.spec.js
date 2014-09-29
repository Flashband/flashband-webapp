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

    expect(pageTitle.isDisplayed()).toBeTruthy();
    expect(pageText.isDisplayed()).toBeTruthy();
    expect(pageSaveButton.isDisplayed()).toBeTruthy();
    expect(pageCancelButton.isDisplayed()).toBeTruthy();
    expect(pageNameInput.isDisplayed()).toBeTruthy();
    expect(pageDocTypeSelect.isDisplayed()).toBeTruthy();

    expect(pageTitle.getText()).toBe("Cadastre um showgoer");
    expect(pageText.getText()).toBe("Para começar, basta informar o nome do showgoer. Depois escolha o tipo de documento e informe o número do documento.");
    expect(pageDocTypeSelect.getText()).toBe("Selecione o documento");
    expect(pageSaveButton.getText()).toBe("Cadastrar");
    expect(pageCancelButton.getText()).toBe("Cancelar");
  });
});
