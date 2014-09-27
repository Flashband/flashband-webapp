'use strict';

describe('The login view', function () {
  it('should visible required elements', function() {
    var enableFlashbandPage = require('../pages/enable.flashband.page');
    enableFlashbandPage.goEnableFlashbands();

    browser.get('#/flashbands-enable');

    var titlePage = element(by.css('h1[translate="FLASHBAND.ENABLE.TITLE"]'));
    expect(titlePage.isDisplayed()).toBeTruthy();
    expect(titlePage.getText()).toBe("Cadastre um lote de pulseiras.");

    var textPage = element(by.css('p[translate="FLASHBAND.ENABLE.TEXT"]'));
    expect(textPage.isDisplayed()).toBeFalsy();
    //expect(textPage.getText()).toBe("Seja bem vindo. Você ainda não possui nenhuma pulseira cadastrada. Para começar, é só clicar em adicionar pulseiras.");

    var btnSubmit = element(by.css('a[translate="FLASHBAND.ENABLE.BUTTON"]'));
    expect(btnSubmit.isDisplayed()).toBeTruthy();
    expect(btnSubmit.getText()).toBe("Cadastrar pulseiras »");
    btnSubmit.click();
    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toContain('#/flashbands-upload');
  });

  it('should import csv file of flashbands', function() {
    var enableFlashbandPage = require('../pages/enable.flashband.page');
    enableFlashbandPage.goUploadFlashbands();

    var btnNewImport = element(by.css('button[translate="FLASHBAND.ENABLE.SAVE"]'));
    btnNewImport.click();

    var msg = element(by.css('div[translate="FLASHBAND.MESSAGE.ERROR.VALIDATION"]'));
    expect(msg.isDisplayed()).toBeTruthy();
    expect(msg.getText()).toBe("Campos obrigatórios! Nome do lote ou arquivo para importação não foi informado.");
  });
});
