var request = require('supertest');
var shared = require('../shared-specs');
var args;

describe('EntranceController', function() {
  shared.shoudRequestNotFoundOnGet('/entrance');

  describe('POST /entrance', function() {
    beforeEach(function(done) {
      args = {flashband: '1234'};
      done();
    });

    it('should register a valid flashband', function (done) {
      Flashband.create({uid: '1234', serial: 1}, function() {
        request(sails.hooks.http.app).post('/entrance').send({flb: args.flashband}).expect(201, done);
      });
    });

    it('should reject duplicated flashband', function (done) {
      request(sails.hooks.http.app).post('/entrance').send({flb: args.flashband}).end(function(err, res) {
        request(sails.hooks.http.app).post('/entrance').send({flb: args.flashband}).expect(403, 'Duplicated entrance.', done);
      });
    });
  });
});
