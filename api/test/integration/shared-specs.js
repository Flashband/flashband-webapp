var async = require('async');
var request = require('supertest');

module.exports.shoudRequestNotFound = function(path, verbs) {
  async.map(verbs, function(verb) {
    it ('should request not found (404) on ' + verb + ' ' + path, function(done) {
      request(sails.hooks.http.app)
      .get(path)
      .expect(404, done);
    });
  });
};
