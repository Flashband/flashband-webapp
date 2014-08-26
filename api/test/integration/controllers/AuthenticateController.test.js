var request = require('supertest');
var shared = require('../shared-specs');
var Q = require('q');
var expect = require('chai').expect;
var passwordHash = require('password-hash');
var validArg;
var userRegistered;

describe('AuthenticateController', function() {
  shared.shoudRequestNotFoundOnGet('/login');

  describe('POST /authenticate', function() {
    beforeEach(function(done) {
      validArg = {nickname: 'userTemp', password: 'passwordTemp'};

      User.create({nickname: validArg.nickname, password: passwordHash.generate(validArg.password)}, function(err, userModel) {
        userRegistered = userModel;
        done();
      });
    });

    it('should allow authentication with valid user data', function (done) {
      Q(User.create({nickname: validArg.nickname, password: passwordHash.generate(validArg.password)})).then( function(err, userModel) {
        request(sails.hooks.http.app).post('/authenticate').send(validArg).expect(202, done);
      });
    });

    it('should danied authentication with invalid user data', function (done) {
      request(sails.hooks.http.app).post('/authenticate').send({nickname: 'userTemp', password: 'passwordTemp123'}).expect(401, done);
    });
  });
});
