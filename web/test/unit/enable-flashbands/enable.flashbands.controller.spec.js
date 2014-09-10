'use strict';

describe('Controller: Login', function(){
  var scope;

  beforeEach(module('flashbandWebapp'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();

    $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  // it('should authenticate a valid user', function() {
  //   var credencials = {
  //     email: 'email@valid.com',
  //     password: 'senhaValida'
  //   };

  //   scope.login(credencials).then(function() {
  //     expect(true).toBe(true);
  //   });
  // });
});
