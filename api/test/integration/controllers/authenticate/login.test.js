'use strict';

var request = require('supertest');
var shared = require('../../shared-specs');
var expect = require('chai').use(require('chai-as-promised')).expect;
var uHelper = require('../../../helpers/UserHelper');

describe('/login', function() {
  shared.shoudRequestNotFound('/login', ['GET', 'PUT', 'DELETE']);
  describe('POST', function() {

    it('should allow with valid user data', function (done) {
      var verifyAuthenticate = function(err, user) {
        if (err)   { return done(err);  }
        if (!user) { return done(user); }

        request(sails.hooks.http.app)
          .post('/login')
          .send({email: user.email, password: user.webpassword})
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
