'use strict';

var request        = require('supertest');
var expect         = require('chai').expect;
var ShowgoerHelper = require('../../../helpers/ShowgoerHelper');
var databaseHelper = require('../../../helpers/DatabaseHelper');
var shared = require('../../shared-specs');
var sgShared = require('./shared');

describe('ShowgoerController /showgoer/search', function() {

  shared.shoudRequestNotFound('/showgoer/search/', ['POST', 'PUT', 'DELETE']);

  describe('GET', function() {
    var serialToken;

    var getSerialToken = function(st) {
      serialToken = st;
    };

    beforeEach(shared.authenticateAnd(getSerialToken));
    beforeEach(function(done) {
      databaseHelper.emptyModels([Showgoer]).then(done).fail(done);
    });

    it ('should filter by name', function(done) {
      var showgoer1 = { name: 'Fulano de Tal', docType: 'cpf', docNumber: '222.222.222-22' };
      var showgoer2 = { name: 'Beltrano de Tal', docType: 'cpf', docNumber: '333.333.333-33' };
      var searchTerm = 'Beltrano de Tal';
      ShowgoerHelper.create([showgoer1, showgoer2]).then(function() {
        request(sails.hooks.http.app)
          .get('/showgoer/search/?s=' + searchTerm)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function(err, res) {
            if (err) { return done(err); }

            var showgoers = res.body;
            expect(showgoers).to.have.length(1, 'Wrong number of showgoers');
            sgShared.verifyShowgoer(showgoers[0], showgoer2);
            done();
          });
      }).fail(done);
    });

    it ('should filter by name containing search term and case insensitive', function(done) {
      var showgoer1 = { name: 'Fulano de Tal', docType: 'cpf', docNumber: '222.222.222-22' };
      var showgoer2 = { name: 'Beltrano de Tal', docType: 'cpf', docNumber: '333.333.333-33' };
      var searchTerm = 'ULAN';
      ShowgoerHelper.create([showgoer1, showgoer2]).then(function() {
        request(sails.hooks.http.app)
          .get('/showgoer/search/?s=' + searchTerm)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function(err, res) {
            if (err) { return done(err); }

            var showgoers = res.body;
            expect(showgoers).to.have.length(1, 'Wrong number of showgoers');
            sgShared.verifyShowgoer(showgoers[0], showgoer1);
            done();
          });
      }).fail(done);
    });

    it ('should filter by document number containing search term and case insensitive', function(done) {
      var showgoer1 = { name: 'Fulano de Tal', docType: 'cpf', docNumber: '222.222.222-22' };
      var showgoer2 = { name: 'Beltrano de Tal', docType: 'cpf', docNumber: '333.333.333-33' };
      var searchTerm = '222.222.222-22';

      ShowgoerHelper.create([showgoer1, showgoer2]).then(function() {
        request(sails.hooks.http.app)
          .get('/showgoer/search/?s=' + searchTerm)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function(err, res) {
            if (err) { return done(err); }

            var showgoers = res.body;
            expect(showgoers).to.have.length(1, 'Wrong number of showgoers');
            sgShared.verifyShowgoer(showgoers[0], showgoer1);
            done();
          });
      }).fail(done);
    });
  });
});
