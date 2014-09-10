'use strict';

describe('Service: Login', function() {
  beforeEach(module('flashbandWebapp'));

  var spyFail,
      spySuccessfully,
      authPromise,
      credencials,
      $httpBackend;

  beforeEach(inject(function(_$httpBackend_, AuthenticateSrvc) {
    $httpBackend = _$httpBackend_;

    spyFail = jasmine.createSpy('spy');
    spySuccessfully = jasmine.createSpy('spy');

    credencials = {
      email: 'email@valid.net.lcc',
      password: 'passwordSample'
    };

    authPromise = AuthenticateSrvc.login(credencials);
  }));

  it('should login successfully with valid credencials', function() {
    var response202 = {
      token: 'the user authentication token',
      user: 10,
      createdAt: '09/04/2014 01:15:27 AM (-0300)',
      updatedAt: '09/04/2014 01:15:27 AM (-0300)'
    };

    $httpBackend.whenPOST('http://localhost:1337/authenticate', credencials).respond(202, response202);
    authPromise.then(spySuccessfully, spyFail);

    $httpBackend.flush();

    expect(spySuccessfully).toHaveBeenCalled();
    expect(spyFail).not.toHaveBeenCalled();
  });

  it('should login fail with invalid credencials', function() {
    $httpBackend.whenPOST('http://localhost:1337/authenticate', credencials).respond(401);
    authPromise.then(spySuccessfully, spyFail);

    $httpBackend.flush();

    expect(spyFail).toHaveBeenCalled();
    expect(spySuccessfully).not.toHaveBeenCalled();
  });
});
