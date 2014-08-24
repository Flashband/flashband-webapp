var request = require('supertest');

module.exports.shoudRequestNotFoundOnGet = function(path) {
  it ('should request not found (404) on GET ' + path, function(done) {
    request(sails.hooks.http.app)
    .get(path)
    .expect(404, done);
  });
};
