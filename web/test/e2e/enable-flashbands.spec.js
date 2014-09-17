'use strict';

var enableFlashbandPage = require('../pages/enable.flashband.page');

describe('The login view', function () {
  beforeEach(function() {
    browser.mock('enable.flashbands.mock');
    enableFlashbandPage.setBrowser(browser).goEnableFlashbands();
  });

  it('should visible required elements', function() {
    browser.get('#/flashbands-enable');
    browser.waitForAngular();

    var titlePage = element(by.css('h1[translate="FLASHBAND.ENABLE.TITLE"]'));
    expect(titlePage.isDisplayed()).toBeTruthy();
    expect(titlePage.getText()).toBe("Cadastre um lote de pulseiras.");

    var textPage = element(by.css('p[translate="FLASHBAND.ENABLE.TEXT"]'));
    expect(textPage.isDisplayed()).toBeTruthy();
    expect(textPage.getText()).toBe("Seja bem vindo. Você ainda não possui nenhuma pulseira cadastrada. Para começar, é só clicar em adicionar pulseiras.");

    var btnSubmit = element(by.css('a[translate="FLASHBAND.ENABLE.BUTTON"]'));
    expect(btnSubmit.isDisplayed()).toBeTruthy();
    expect(btnSubmit.getText()).toBe("Cadastrar pulseiras »");
    btnSubmit.click();
    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toContain('#/flashbands-upload');
  });
});
