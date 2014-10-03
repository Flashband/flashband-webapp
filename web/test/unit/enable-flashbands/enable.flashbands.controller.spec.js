/*globals describe, beforeEach, it, expect, inject*/
'use strict';

describe('Controller: EnableFlashbandsCtrl', function(){
  var scope, $httpBackend, browserState;

  beforeEach(module('flashbandWebapp'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $state, _FlashbandSessionFact_) {
    browserState = $state;
    $httpBackend = _$httpBackend_;

    _FlashbandSessionFact_.setSession({
      "token": "sha1$814c71c9$1$0a5f89d5a5c6327658c1619bc761a38b10a110b8",
      "user": {
        "email": "admin@flashband.com",
        "mobpassword": "123123",
        "webpassword": "123123",
        "id": "542323c754527d6422d35dad"
      }
    });

    scope = $rootScope.$new();

    $controller('EnableFlashbandsCtrl', {
      $scope: scope
    });
  }));

  describe("#setFile", function() {
    it ('should view message extension error when not fill file csv to import', function() {
      scope.setFile([{"name": "flashbands.png"}]);
      expect(scope.errorExtension).toBeTruthy();
    });

    it ('should set file in scope when fill a csv', function() {
      scope.setFile([{"name": "flashbands.csv"}]);
      expect(scope.files[0].name).toEqual("flashbands.csv");
    });
  });

  describe('#saveFlashbands', function() {
    beforeEach(function() {
      $httpBackend.whenGET('http://localhost:1337/flashband/enable').respond(200, {total: 0});
    });

    it ('should view message error when not fill file to import', function() {
      scope.nameBatch = "Arquivo de pulseiras para importação.";
      expect(scope.message).toBeFalsy();
      scope.saveFlashbands();
      expect(scope.message).toEqual({
        type: "warning",
        text: "FLASHBAND.MESSAGE.ERROR.VALIDATION"
      });
    });

    it ('should redirect to success page for finish import flashbands', function() {
      scope.nameBatch = "Arquivo de pulseiras para importação.";
      scope.setFile([{"name": "flashbands.csv"}]);
      scope.saveFlashbands();

      $httpBackend.whenPOST('http://localhost:1337/flashband/enable').respond(201, {});
      $httpBackend.whenGET('http://localhost:1337/flashband/summary').respond(201, {total: 0});
      $httpBackend.whenGET('partials/login.html').respond(201);
      $httpBackend.whenGET('partials/dashboard.html').respond(201);
      $httpBackend.whenGET('partials/flashbands-enable.html').respond(201);

      $httpBackend.flush();
      expect(scope.message).toBeFalsy();
      expect(browserState.current.name).toEqual('finish-flashbands');
    });

    it ('should view message error when file csv contains errors', function() {
      scope.nameBatch = "Arquivo de pulseiras para importação.";
      scope.setFile([{"name": "flashbands.csv"}]);

      $httpBackend.whenPOST('http://localhost:1337/flashband/enable').respond(400, {});
      $httpBackend.whenGET('http://localhost:1337/flashband/summary').respond(201, {total: 0});
      $httpBackend.whenGET('partials/login.html').respond(201);
      $httpBackend.whenGET('partials/dashboard.html').respond(201);
      expect(scope.message).toBeFalsy();
      scope.saveFlashbands();

      $httpBackend.flush();
      expect(scope.message).toEqual({
        type: "danger",
        text: "FLASHBAND.MESSAGE.ERROR.UPLOAD"
      });
    });
  });
});
