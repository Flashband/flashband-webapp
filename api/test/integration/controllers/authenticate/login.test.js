'use strict';

var request = require('supertest');
var shared = require('../../shared-specs');
var expect = require('chai').use(require('chai-as-promised')).expect;
var uHelper = require('../../../helpers/UserHelper');
var authShared = require('./shared');

describe('AuthenticateController /login', function() {

  shared.shoudRequestNotFound('/login', ['GET', 'PUT', 'DELETE']);

  describe('POST', function() {
    it('should allow with valid user data', function (done) {

      uHelper.createAnonymous().exec(function(err, user) {
        if (err) return done(err);
        var params = {
          path: '/login',
          body: {email: user.email, password: user.webpassword},
          user: user
        };
        authShared.verifyAuthenticate(params, done);
      });
    });

    it('should deny login with invalid user data', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({email: 'admin@flashband.com', password: 'invalidPassword'})
        .expect(401)
        .expect('Content-Type', /application\/json/)
        .end(done);
    });
  });
});
