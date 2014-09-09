'use strict';

describe('Service: Login', function() {
  beforeEach(module('flashbandWebapp'));

  it('should get a flashband', inject(function(_$httpBackend_, AuthenticateSrvc) {
      var credencials = {
        email: 'email@valid.net.lcc',
        password: 'passwordSample'
      };

      _$httpBackend_.whenPOST('http://localhost:1337/authenticate', credencials).respond(202, {
        token: 'the user authentication token',
        user: 10,
        createdAt: '09/04/2014 01:15:27 AM (-0300)',
        updatedAt: '09/04/2014 01:15:27 AM (-0300)'
      });

      var promise = AuthenticateSrvc.login(credencials);
      var result = promise.$object;

      _$httpBackend_.flush();

      expect(result.user).toEqual(10);
  }));
});
