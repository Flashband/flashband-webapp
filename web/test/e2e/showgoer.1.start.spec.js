'use strict';

var loginPage = require('../pages/login.page');

describe('Start ShowGoer View', function () {
  // it('should visible info and inputs', function() {
  //   loginPage.tryAuthenticateSuccessfully();
  //   browser.get('#/showgoer');
  //
  //   var pageTitle = element(by.css('h1[translate="FLASHBAND.SHOWGOER.TEXT.TITLE"]'));
  //   var pageTextStart = element(by.css('p[translate="FLASHBAND.SHOWGOER.TEXT.START"]'));
  //   var pageTextCreated = element(by.css('p[translate="FLASHBAND.SHOWGOER.TEXT.CREATED"]'));
  //   var pageButtonNew = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON.NEW"]'));
  //   var pageButtonAssociate = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON.ASSOCIATE"]'));
  //
  //   expect(pageTitle.isDisplayed()).toBeTruthy();
  //   expect(pageTextStart.isDisplayed()).toBeTruthy();
  //   expect(pageTextCreated.isDisplayed()).toBeFalsy();
  //
  //   expect(pageButtonNew.isDisplayed()).toBeTruthy();
  //   expect(pageButtonAssociate.isDisplayed()).toBeFalsy();
  //
  //   expect(pageTitle.getText()).toBe('Cadastre um ShowGoer');
  //   expect(pageTextStart.getText()).toBe('Você ainda não possui nenhum ShowGoer cadastrado. Para começar é só clicar em cadastrar ShowGoer.');
  //   expect(pageButtonNew.getText()).toBe('Cadastrar ShowGoer');
  // });

  it('should have link to /ShowGoer', function() {
    loginPage.tryAuthenticateSuccessfully();
    var linkToShowGoer = element(by.css('a[translate="FLASHBAND.MENU.SHOWGOER"]'));
    linkToShowGoer.click();
    expect(browser.getCurrentUrl()).toContain('#/showgoer');
  });

  it('should link to /ShowGoer/new', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/showgoer');
    var linkToNewShowGoer = element(by.css('a[translate="FLASHBAND.SHOWGOER.BUTTON.NEW"]'));
    linkToNewShowGoer.click();

    expect(browser.getCurrentUrl()).toContain('#/showgoer/new');
  });
});
