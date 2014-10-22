'use strict';

var request        = require('supertest');
var expect         = require('chai').expect;
var ShowgoerHelper = require('../../../helpers/ShowgoerHelper');
var databaseHelper = require('../../../helpers/DatabaseHelper');
var shared = require('../../shared-specs');
var sgShared = require('./shared');

describe('ShowgoerController /showgoer', function() {

  shared.shoudRequestNotFound('/showgoer/', ['PUT', 'DELETE']);


  describe('GET', function() {
    var serialToken;

    var getSerialToken = function(st) {
      serialToken = st;
    };

    beforeEach(shared.authenticateAnd(getSerialToken));
    beforeEach(function(done) {
      databaseHelper.emptyModels([Showgoer]).then(done).fail(done);
    });

    it ('should be ok', function(done) {
      request(sails.hooks.http.app)
        .get('/showgoer/')
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .set('Authorization', 'Token token='.concat(serialToken))
        .end(done);
    });

    it ('should list showgoers', function(done) {
      var expected = { name: 'Fulano de Tal', docType: 'cpf', docNumber: '111.111.111-11' };
      ShowgoerHelper.create(expected).then(function() {
        request(sails.hooks.http.app)
          .get('/showgoer/')
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function(err, res) {
            if (err) { return done(err); }

            var showgoers = res.body;
            expect(showgoers).to.have.length(1, 'Wrong number of showgoers');
            sgShared.verifyShowgoer(showgoers[0], expected);
            done();
          });
      }).fail(done);
    });
  });
});
