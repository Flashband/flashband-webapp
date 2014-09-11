'use strict';

describe('Controller: EnableFlashbandsCtrl', function(){
  var scope;

  beforeEach(module('flashbandWebapp'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();

    $controller('EnableFlashbandsCtrl', {
      $scope: scope
    });
  }));
});
