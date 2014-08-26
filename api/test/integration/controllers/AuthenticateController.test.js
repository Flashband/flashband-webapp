var request = require('supertest');
var shared = require('../shared-specs');

describe('AuthenticateController', function() {
  shared.shoudRequestNotFoundOnGet('/login');

  describe('POST /authenticate', function() {
    it('should allow authentication with valid user data', function (done) {
      User.create({password: 'validPassword'}, function(err, userModel) {
        request(sails.hooks.http.app).post('/authenticate').send({password: 'validPassword'}).expect(202, done);
      });
    });

    it('should danied authentication with invalid user data', function (done) {
      request(sails.hooks.http.app).post('/authenticate').send({password: 'invalidPassword'}).expect(401, done);
    });
  });
});
