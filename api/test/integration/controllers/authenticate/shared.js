'use strict';

var request = require('supertest');
var expect = require('chai').use(require('chai-as-promised')).expect;

module.exports = { 
  verifyAuthenticate: function(params, done) {
    request(sails.hooks.http.app)
      .post(params.path)
      .send(params.body)
      .expect('Content-type', /application\/json/)
      .expect(202)
      .end(function(err, res) {
        expect(res.body).to.have.property('token').and.is.a('string').and.match(/^sha1.*/);
        expect(res.body).to.have.property('user').and.is.a('object').and.to.have.property('email', params.user.email);
        done(err);
      });

  } 
};
