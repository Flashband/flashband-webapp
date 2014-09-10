'use strict';

describe('Controller: Login', function(){
  var scope,
      browserState,
      $httpBackend;

  beforeEach(module('flashbandWebapp'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $state) {
    browserState = $state;
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();

    $controller('AuthenticateCtrl', {
      $scope: scope
    });
  }));

  it('should authenticate a valid user', function() {
    var credencials = {
      email: 'email@valid.com',
      password: 'senhaValida'
    };

    var response202 = {
      token: 'the user authentication token',
      user: 10,
      createdAt: '09/04/2014 01:15:27 AM (-0300)',
      updatedAt: '09/04/2014 01:15:27 AM (-0300)'
    };

    $httpBackend.whenGET('partials/main.html').respond(201);
    $httpBackend.whenPOST('http://localhost:1337/authenticate', credencials).respond(202, response202);

    scope.login(credencials);
    $httpBackend.flush();

    expect(browserState.current.name).toEqual('dashboard');
  });
});
