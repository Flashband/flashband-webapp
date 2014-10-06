'use strict';

var loginPage = require('../pages/login.page');

describe('The Associate Showgoer view', function () {
  it('should contains help message', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/associate/search');

    var pageTitle = element(by.css('h1[translate="FLASHBAND.ASSOCIATE.TEXT.TITLE"]'));
    var pageText = element(by.css('p[translate="FLASHBAND.ASSOCIATE.TEXT.NEW"]'));
    var pageSaveButton = element(by.css('button[translate="FLASHBAND.ASSOCIATE.BUTTON.ASSOCIATE"]'));
    var pageCancelButton = element(by.css('a[translate="FLASHBAND.ASSOCIATE.BUTTON.CANCEL"]'));
    var pageShowGoerInput = element(by.model('showgoerSearch'));

    expect(pageTitle.isDisplayed()).toBeTruthy();
    expect(pageText.isDisplayed()).toBeTruthy();
    expect(pageSaveButton.isDisplayed()).toBeTruthy();
    expect(pageCancelButton.isDisplayed()).toBeTruthy();
    expect(pageShowGoerInput.isDisplayed()).toBeTruthy();

    expect(pageTitle.getText()).toBe("Vincular showgoer");
    expect(pageText.getText()).toBe("Para Vincular um showgoer a uma pulseira, basta buscar pelo nome ou número do documento cadastrado. Depois é só clicar em vincular e aproximar a pulseira do leitor.");
    expect(pageSaveButton.getText()).toBe("Vincular");
    expect(pageCancelButton.getText()).toBe("Cancelar");
  });
});
