'use strict';

var request = require('supertest');
var shared  = require('../../shared-specs');
var fdShared = require('./shared');
var fbHelp  = require('../../../helpers/FlashbandHelper');
var fdHelp  = require('../../../helpers/FrontdoorHelper');
var dbHelp  = require('../../../helpers/DatabaseHelper');

describe('FrontdoorController /frontdoor/leave', function() {
var serialToken;

  shared.shoudRequestNotFound('/frontdoor/leave', ['GET', 'PUT', 'DELETE']);

  describe('POST', function() {
    var getSerialToken = function(st) {
      serialToken = st;
    };
    beforeEach(shared.authenticateAnd(getSerialToken));
    beforeEach(function(done) {
      dbHelp.emptyModels([Entrance, Flashband, Showgoer]).then(done).fail(done);
    });

    it('should leave a valid flashband', function (done) {
      var verifyLeave = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/leave')
          .send({tag: entrance.tag, zone: '1'})
          .expect('Content-type', /application\/json/)
          .expect(201)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(fdShared.verifySuccessfulLeave(done));
      };

      fdHelp.createEntrance().then(verifyLeave).fail(done);
    });

    it('should reject a invalid flashband', function (done) {
      request(sails.hooks.http.app)
        .post('/frontdoor/leave')
        .send({tag: '123123123123', zone: '1'})
        .expect(403, 'Flashband not found.')
        .set('Authorization', 'Token token='.concat(serialToken))
        .end(done);
    });

    it('should reject an unassociated flashband', function (done) {
      var verifyUnassociated = function(flashband) {
        request(sails.hooks.http.app)
          .post('/frontdoor/leave')
          .send({tag: flashband.tag, zone: '1'})
          .expect(403, 'Flashband not associated.')
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fbHelp.createSuccess().then(verifyUnassociated).fail(done);
    });

    it('should reject blocked flashband', function (done) {
      var verifyFlashBandBlocked = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/leave')
          .send({tag: entrance.tag, zone: '1'})
          .expect(403, 'Blocked flashband.')
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fdHelp.createEntranceAndBlocked().then(verifyFlashBandBlocked).fail(done);
    });

    it('should reject duplicated flashband', function (done) {
      var verifyDuplicated = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/leave')
          .send({tag: entrance.tag, zone: '1'})
          .expect(403, 'Duplicated exit.')
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fdHelp.createLeave().then(verifyDuplicated).fail(done);
    });

    it('should reject when zone not filled', function (done) {
      var verifyZoneEmpty = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/leave')
          .send({tag: entrance.tag})
          .expect(403, 'Zone not filled.')
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fbHelp.createSuccess().then(verifyZoneEmpty, done);
    });
  });
});
