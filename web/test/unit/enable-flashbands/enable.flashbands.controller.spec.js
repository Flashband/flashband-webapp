/*globals describe, beforeEach, it, expect, inject*/
'use strict';

describe('Controller: EnableFlashbandsCtrl', function(){
  var scope, $httpBackend;

  beforeEach(module('flashbandWebapp'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();

    $controller('EnableFlashbandsCtrl', {
      $scope: scope
    });
  }));

  describe('#onFileSelect', function() {
    beforeEach(function() {
      scope.onFileSelect([{}]);
    });
    it ('should set flashbandsEnabled on successfully upload', function() {
      $httpBackend.whenPOST('http://localhost:1337/flashband/enable')
        .respond(201, {message: 'Flashbands enabled successfully'});
      expect(scope.flashbandsEnabled).toEqual(false);
      $httpBackend.flush();
      expect(scope.flashbandsEnabled).toEqual(true);
    });
    it ('should set message on successfully upload', function() {
      $httpBackend.whenPOST('http://localhost:1337/flashband/enable')
        .respond(201, {message: 'Flashbands enabled successfully'});
      expect(scope.message).toBeFalsy();
      $httpBackend.flush();
      expect(scope.message).toEqual('Flashbands enabled successfully');
    });
  });

  it('test with $httpBackend', function() {
    $httpBackend.whenPOST('http://localhost:1337/flashband/enable').respond({message: 'Flashbands enabled successfully'});
    expect(scope.onFileSelect).toBeDefined();
    //$httpBackend.flush();
    
    //$scope.userPassword = 'wrong-password';
    //$scope.signinClick();
    //$httpBackend.flush();
    //$timeout(function() {
      //expect($scope.userId).toEqual('');
      //expect($scope.userPassword).toEqual('');
    //}, 2000);
  });
});
