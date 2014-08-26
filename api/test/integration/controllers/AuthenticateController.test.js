var request = require('supertest');
var shared = require('../shared-specs');
var Q = require('q');
var expect = require('chai').expect;

describe('AuthenticateController', function() {
  shared.shoudRequestNotFoundOnGet('/login');

  describe('POST /authenticate', function() {
    beforeEach(function(done) {
      validArg = {nickname: 'userTemp', password: 'passwordTemp'};
      invalidArg = {nickname: 'userTemp', password: 'passwordTemp'};
      done();
    });

    it('should allow authentication with valid user data', function (done) {
      User.create(validArg, function(err, userModel) {
        request(sails.hooks.http.app).post('/authenticate').send(validArg).expect(202, done);
      });
    });

    // it('should danied authentication with invalid user data', function (done) {
    //   request(sails.hooks.http.app).post('/authenticate').send(invalidArg).expect(401, done);
    // });
  });
});
