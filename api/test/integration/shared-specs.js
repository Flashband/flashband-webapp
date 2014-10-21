'use strict';

var aSync = require('async');
var request = require('supertest');

var send = {
  'GET': function(path, done) {
      request(sails.hooks.http.app)
        .get(path)
        .expect(404, done);
  },

  'POST': function(path, done) {
      request(sails.hooks.http.app)
        .post(path)
        .expect(404, done);
  },

  'PUT': function(path, done) {
      request(sails.hooks.http.app)
        .put(path)
        .expect(404, done);
  },


  'DELETE': function(path, done) {
      request(sails.hooks.http.app)
        .delete(path)
        .expect(404, done);
  }
};

module.exports.shoudRequestNotFound = function(path, verbs) {
  aSync.map(verbs, function(verb) {
    it ('should respond Not Found (404) for ' + verb + ' ' + path, function(done) {
      send[verb](path, done);
    });
  });
};
