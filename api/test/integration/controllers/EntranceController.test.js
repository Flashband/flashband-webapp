var Sails = require('sails');
var expect = require('expect.js');
var request = require('supertest');

describe('EntranceController', function() {
  describe('POST /entrance', function() {
    it('should reject non-existing flashband', function (done) {
      request(sails.hooks.http.app)
        .post('/entrance')
        .send({flb: "123456"})
        .expect(403, done);
    });
  });
  describe('GET /entrance', function() {
    it('should not allow', function (done) {
      request(sails.hooks.http.app)
        .get('/entrance')
        .expect(404, done);
    });
  });
});
