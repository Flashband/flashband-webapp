var request = require('supertest');

describe('HomeController', function() {
  describe('GET-Success /', function() {
    it('should get all entrances', function (done) {
      request(sails.hooks.http.app)
        .get('/')
        .expect(200, done);
    });
  });
});
