'use strict';

var enableFlashbandPage = require('../pages/enable.flashband.page');

describe('The login view', function () {
  it('should import csv file of flashbands', function() {
    browser.mock('enable.flashbands.mock');
    enableFlashbandPage.setBrowser(browser).goEnableFlashbands();

    browser.get('#/flashbands-upload');
    browser.waitForAngular();

    var btnNewImport = element(by.css('button[translate="FLASHBAND.ENABLE.SAVE"]'));
    btnNewImport.click();

    var msg = element(by.css('div[translate="FLASHBAND.MESSAGE.ERROR.VALIDATION"]'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe("Campos obrigatórios!");
  });

  it('should visible required elements', function() {
    browser.mock('enable.flashbands.mock');
    enableFlashbandPage.setBrowser(browser).goEnableFlashbands();

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
