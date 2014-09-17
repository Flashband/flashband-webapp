'use strict';

describe('Controller: Login', function(){
  var scope,
      credencials,
      browserState,
      $httpBackend;

  beforeEach(module('flashbandWebapp'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $state) {
    browserState = $state;
    $httpBackend = _$httpBackend_;

    credencials = {
      email: 'email@valid.com',
      password: 'senhaValida'
    };

    scope = $rootScope.$new();

    $controller('AuthenticateCtrl', {
      $scope: scope
    });
  }));

  it('should redirect to dashboard when AuthenticateCtrl authenticate successfully', function() {
    var response202 = {
      token: 'the user authentication token',
      user: 10,
      createdAt: '09/04/2014 01:15:27 AM (-0300)',
      updatedAt: '09/04/2014 01:15:27 AM (-0300)'
    };

    $httpBackend.whenPOST('http://localhost:1337/login', credencials).respond(202, response202);
    $httpBackend.whenGET('partials/login.html').respond(201);
    $httpBackend.whenGET('partials/dashboard.html').respond(201);

    scope.login(credencials);
    $httpBackend.flush();

    expect(browserState.current.name).toEqual('dashboard');
  });

  it('should view message error when AuthenticateCtrl authenticate failed', function() {
    $httpBackend.whenPOST('http://localhost:1337/login', credencials).respond(401);
    $httpBackend.whenGET('partials/login.html').respond(201);

    scope.login(credencials);
    $httpBackend.flush();

    expect(scope.message).toEqual({
      type: 'alert',
      text: 'LOGIN.MESSAGE.ERROR'
    });
  });
});
