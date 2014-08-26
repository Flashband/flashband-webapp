var request = require('supertest');
var shared = require('../shared-specs');

describe('EntranceController', function() {
  shared.shoudRequestNotFoundOnGet('/entrance');

  describe('POST /entrance', function() {
    beforeEach(function() {
      args = {flashband: '1234'};
      Entrance.drop();
    });

    it('should register an valid flashband', function (done) {
      request(sails.hooks.http.app).post('/entrance').send({flb: args.flashband}).expect(201, done);
    });

    it('should reject duplicated flashband', function (done) {
      request(sails.hooks.http.app).post('/entrance').send({flb: args.flashband}).end(function(err, res) {
        request(sails.hooks.http.app).post('/entrance').send({flb: args.flashband}).expect(403, done);
      });
    });
  });
});
