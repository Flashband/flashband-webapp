'use strict';

var request = require('supertest');
var shared = require('../../shared-specs');
var expect = require('chai').use(require('chai-as-promised')).expect;
var uHelper = require('../../../helpers/UserHelper');
var authShared = require('./shared');

describe('AuthenticateController /authenticate', function() {

  shared.shoudRequestNotFound('/authenticate', ['GET', 'PUT', 'DELETE']);

  describe('POST', function() {
    it('should allow authentication with valid user data', function (done) {

      uHelper.createAnonymous().exec(function(err, user) {
        if (err) return done(err);
        var params = {
          path: '/authenticate',
          body: { password: user.mobpassword },
          user: user
        };
        authShared.verifyAuthenticate(params, done);
      });
    });

    it('should deny authentication with invalid user data', function (done) {
      request(sails.hooks.http.app)
      .post('/authenticate')
      .send({password: 'invalidPassword'})
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .end(done);
    });
  });
});
