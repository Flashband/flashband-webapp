'use strict';

var request = require('supertest');
var shared = require('../../shared-specs');
var expect = require('chai').use(require('chai-as-promised')).expect;
var uHelper = require('../../../helpers/UserHelper');

describe('/authenticate', function() {
  shared.shoudRequestNotFound('/authenticate', ['GET', 'PUT', 'DELETE']);

  describe('POST', function() {
    it('should allow authentication with valid user data', function (done) {
      var verifyAuthenticate = function(err, user) {
        if (err) return done(err);
        if (!user) return done(user);

        request(sails.hooks.http.app)
          .post('/authenticate')
          .send({ password: user.mobpassword })
          .expect('Content-type', /application\/json/)
          .expect(202)
          .end(function(err, res) {
            expect(res.body).to.have.property('token').and.is.a('string').and.match(/^sha1.*/);
            expect(res.body).to.have.property('user').and.is.a('object').and.to.have.property('email', user.email);
            done(err);
          });
      };

      uHelper.createAnonymous().exec(verifyAuthenticate);
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
