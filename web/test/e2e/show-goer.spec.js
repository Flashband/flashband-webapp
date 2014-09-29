'use strict';

var loginPage = require('../pages/login.page');

describe('The Show goer view', function () {
  it('should contains welcome message', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer');

    var pageTitle = element(by.css('h1[translate="FLASHBAND.SHOWGOER.TITLE"]'));
    var pageText = element(by.css('p[translate="FLASHBAND.SHOWGOER.TEXT"]'));
    var pageButton = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON"]'));

    expect(pageTitle.isDisplayed()).toBeTruthy();
    expect(pageText.isDisplayed()).toBeTruthy();
    expect(pageButton.isDisplayed()).toBeTruthy();

    expect(pageTitle.getText()).toBe("Cadastre um showgoer");
    expect(pageText.getText()).toBe("Você ainda não possui nenhum showgoer cadastrado. Para começar é só clicar em cadastrar showgoer.");
    expect(pageButton.getText()).toBe("Cadastrar showgoer"); 
  });
});
