'use strict';

var request = require('supertest');
var shared  = require('../../shared-specs');
var fdShared = require('./shared');
var fbHelp  = require('../../../helpers/FlashbandHelper');
var fdHelp  = require('../../../helpers/FrontdoorHelper');
var dbHelp  = require('../../../helpers/DatabaseHelper');
var expect = require('chai').use(require('chai-as-promised')).expect;

describe('FrontdoorController /frontdoor/cross', function() {
  var serialToken;

  shared.shoudRequestNotFound('/frontdoor/cross', ['GET', 'PUT', 'DELETE']);

  describe('POST', function() {
    var getSerialToken = function(st) {
      serialToken = st;
    };
    beforeEach(shared.authenticateAnd(getSerialToken));
    beforeEach(function(done) {
      dbHelp.emptyModels([Entrance, Flashband, Showgoer]).then(done).fail(done);
    });

    it('should register a valid flashband', function (done) {
      var verifyRegister = function(flashband) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: flashband.tag, zone: '1'})
          .expect('Content-type', /application\/json/)
          .expect(201)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(fdShared.verifySuccessfulEnter(done));
      };

      fbHelp.createAssociated().then(verifyRegister).fail(done);
    });

    it('should leave a valid flashband', function (done) {
      var verifyLeave = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
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
        .post('/frontdoor/cross')
        .send({tag: '123123123123', zone: '1'})
        .expect(403, 'Flashband not found.')
        .set('Authorization', 'Token token='.concat(serialToken))
        .end(done);
    });

    it('should reject an unassociated flashband', function (done) {
      var verifyUnassociated = function(flashband) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
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
          .post('/frontdoor/cross')
          .send({tag: entrance.tag, zone: '1'})
          .expect(403, 'Blocked flashband.')
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fdHelp.createEntranceAndBlocked().then(verifyFlashBandBlocked).fail(done);
    });

    it('should register a valid flashband after exit', function (done) {
      var verifyRegister = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag, zone: '1'})
          .expect('Content-type', /application\/json/)
          .expect(201)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(fdShared.verifySuccessfulEnter(done));
      };

      fdHelp.createLeave().then(verifyRegister);
    });

    it('should register output after entering 2x', function (done) {
      var verifyRegister = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag, zone: '1'})
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function(err) {
            if (err) { return done(err); }
            request(sails.hooks.http.app)
              .post('/frontdoor/cross')
              .send({tag: entrance.tag, zone: '1'})
              .expect('Content-type', /application\/json/)
              .expect(201)
              .set('Authorization', 'Token token='.concat(serialToken))
              .end(fdShared.verifySuccessfulLeave(done));
          });
      };

      fdHelp.createLeave().then(verifyRegister);
    });

    it('must register the entry after leaving 2x', function (done) {
      var verifyRegister = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag, zone: '1'})
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function() {
            request(sails.hooks.http.app)
              .post('/frontdoor/cross')
              .send({tag: entrance.tag, zone: '1'})
              .set('Authorization', 'Token token='.concat(serialToken))
              .end(function() {
                request(sails.hooks.http.app)
                  .post('/frontdoor/cross')
                  .send({tag: entrance.tag, zone: '1'})
                  .expect('Content-type', /application\/json/)
                  .expect(201)
                  .set('Authorization', 'Token token='.concat(serialToken))
                  .end(fdShared.verifySuccessfulEnter(done));
              });
          });
      };

      fdHelp.createLeave().then(verifyRegister);
    });

    it('should reject when zone not filled', function (done) {
      var verifyZoneEmpty = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag})
          .expect(403, 'Zone not filled.')
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fbHelp.createSuccess().then(verifyZoneEmpty, done);
    });

    it('should allow entrance when zone is different', function (done) {
      var verifyZoneEmpty = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag, zone: '1'})
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function() {
            request(sails.hooks.http.app)
              .post('/frontdoor/cross')
              .send({tag: entrance.tag, zone: '2'})
              .expect('Content-type', /application\/json/)
              .expect(201)
              .set('Authorization', 'Token token='.concat(serialToken))
              .end(fdShared.verifySuccessfulEnter(done));
          });
      };

      fbHelp.createAssociated().then(verifyZoneEmpty, done);
    });

    it('should leave old entrance when entrance in different zone', function (done) {
      var verifyZoneEmpty = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag, zone: '1'})
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function() {
            request(sails.hooks.http.app)
              .post('/frontdoor/cross')
              .send({tag: entrance.tag, zone: '2'})
              .set('Authorization', 'Token token='.concat(serialToken))
              .end(function() {
                Entrance.findOne({tag: entrance.tag, zone: '1'}).then(function (oldEntrance) {
                  expect(oldEntrance.leave).to.be.ok;

                  Entrance.findOne({tag: entrance.tag, zone: '2'}).then(function (actualEntrance) {
                    expect(actualEntrance.leave).to.not.be.ok;
                    done();
                  }, done);
                }, done);
              });
          });
      };

      fbHelp.createAssociated().then(verifyZoneEmpty, done);
    });
  });
});
