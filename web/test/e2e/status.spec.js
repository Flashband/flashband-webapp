'use strict';

var loginPage = require('../pages/login.page');

describe('Access Status View', function () {
  it('should have link to /status', function() {
    loginPage.tryAuthenticateSuccessfully();
    var linkToStatus = element(by.css('a[translate="FLASHBAND.MENU.STATUS"]'));
    linkToStatus.click();
    expect(browser.getCurrentUrl()).toContain('#/status');
  });

  iit('should have title of page and list of showgoers', function() {
    loginPage.tryAuthenticateSuccessfully();
    browser.get('#/status');

    var pageTitle = element(by.css('h1[translate="FLASHBAND.STATUS.TEXT.TITLE"]'));
    var pageList = element(by.css('table#showgoers-list'));

    expect(pageTitle.isDisplayed()).toBeTruthy();
    expect(pageList.isDisplayed()).toBeTruthy();

    expect(pageTitle.getText()).toBe('Flashbands no evento (8)');
  });

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
});
