var request = require('supertest');
var shared = require('../shared-specs');

describe('EntranceController', function() {
  shared.shoudRequestNotFoundOnGet('/entrance');

  describe('POST /entrance', function() {
    it('should reject non-existing flashband', function (done) {
      request(sails.hooks.http.app)
        .post('/entrance')
        .send({flb: '123456'})
        .expect(403, done);
    });

    //it('should allow existing flashband', function(done) {
      //registrar a flashband
    //  request(sails.hooks.http.app)
    //    .post('/entrance')
    //    .send({flb: "123456"})
    //    .expect(201, done);
    //});
  });
});
