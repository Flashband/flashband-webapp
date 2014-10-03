'use strict';

var loginPage = require('../pages/login.page');

describe('The Showgoer view', function () {
  it('should visible info and inputs', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer');

    var pageTitle = element(by.css('h1[translate="FLASHBAND.SHOWGOER.TEXT.TITLE"]'));
    var pageTextStart = element(by.css('p[translate="FLASHBAND.SHOWGOER.TEXT.START"]'));
    var pageTextCreated = element(by.css('p[translate="FLASHBAND.SHOWGOER.TEXT.CREATED"]'));
    var pageButtonNew = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON.NEW"]'));
    var pageButtonAssociate = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON.ASSOCIATE"]'));

    expect(pageTitle.isDisplayed()).toBeTruthy();
    expect(pageTextStart.isDisplayed()).toBeTruthy();
    expect(pageTextCreated.isDisplayed()).toBeFalsy();

    expect(pageButtonNew.isDisplayed()).toBeTruthy();
    expect(pageButtonAssociate.isDisplayed()).toBeFalsy();

    expect(pageTitle.getText()).toBe("Cadastre um showgoer");
    expect(pageTextStart.getText()).toBe("Você ainda não possui nenhum showgoer cadastrado. Para começar é só clicar em cadastrar showgoer.");
    expect(pageButtonNew.getText()).toBe("Cadastrar showgoer");
  });

  it('should have link to /showgoer', function() {
    loginPage.tryAuthenticateSuccessfully();
    var linkToShowgoer = element(by.css('a[translate="FLASHBAND.MENU.SHOWGOER"]'));
    linkToShowgoer.click();
    expect(browser.getCurrentUrl()).toContain('#/showgoer');
  });

  it('should link to /showgoer/new', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer');
    var linkToNewShowgoer = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON.NEW"]'));
    linkToNewShowgoer.click();
    expect(browser.getCurrentUrl()).toContain('#/showgoer/new');
  });
});
