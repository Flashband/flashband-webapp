'use strict';

var aSync = require('async');
var request = require('supertest');
var pwHash  = require('password-hash');
var dbHelp  = require('../helpers/DatabaseHelper');

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

module.exports = { 
  shoudRequestNotFound: function(path, verbs) {
    aSync.map(verbs, function(verb) {
      var spec = 'should respond Not Found (404) for ' + verb + ' ' + path;
      it (spec, function(done) {
        send[verb](path, done);
      });
    });
  },

  authenticateAnd: function(getSerialToken) {
    return function(done) {
      dbHelp.emptyModels([User]).then(function() {
        User.create({password: '123123123'}).then(function(user) {
          var serialToken = pwHash.generate(user.id);
          if (getSerialToken) getSerialToken(serialToken);
          user.tokens.add({ token: serialToken });
          user.save(done);
        }).fail(done);
      }).fail(done);
    };
  }
};
