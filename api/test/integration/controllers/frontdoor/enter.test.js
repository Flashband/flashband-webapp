'use strict';

var request = require('supertest');
var pwHash  = require('password-hash');
var shared  = require('../../shared-specs');
var fbHelp  = require('../../../helpers/FlashbandHelper');
var fdHelp  = require('../../../helpers/FrontdoorHelper');
var sgHelp  = require('../../../helpers/ShowgoerHelper');
var dbHelp  = require('../../../helpers/DatabaseHelper');
var expect = require('chai').use(require('chai-as-promised')).expect;

describe('FrontdoorController /frontdoor/enter', function() {
var serialToken;
var inputSuccessful;

  shared.shoudRequestNotFound('/frontdoor/enter', ['GET', 'PUT', 'DELETE']);

  describe('POST', function() {
    var getSerialToken = function(st) {
      serialToken = st;
    };

    beforeEach(shared.authenticateAnd(getSerialToken));

    beforeEach(function(done) {
      dbHelp.emptyModels([Entrance, Flashband, Showgoer]).then(function() {
        inputSuccessful  = {door: 'in', message: 'Input successful.', showgoer: null};
        done();
      }).fail(done);
    });

    it('should register a valid flashband', function (done) {
      var verifyRegister = function(flashband) {
        request(sails.hooks.http.app)
          .post('/frontdoor/enter')
          .send({tag: flashband.tag})
          .expect('Content-type', /application\/json/)
          .expect(201, inputSuccessful)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fbHelp.createSuccess().then(verifyRegister);
    });

    it('should include showgoer when register a valid flashband', function (done) {
      var flashband;
      var verifyRegister = function() {
        request(sails.hooks.http.app)
          .post('/frontdoor/enter')
          .send({tag: flashband.tag})
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body).to.have.property('showgoer').and.have.property('name', 'Fulano de Tal');
            done();
          });
      };

      fbHelp.createSuccess().then(verifyRegister);
      fbHelp.createSuccess().then(function(f) {
        flashband = f;
        sgHelp.create().then(function(showgoer) {
          ShowgoerService.associate(showgoer.id, flashband.tag).then(verifyRegister).fail(done);
        }).fail(done);
      }).fail(done);
    });

    it('should reject a invalid flashband', function (done) {
      request(sails.hooks.http.app)
        .post('/frontdoor/enter')
        .send({tag: '123123123123'})
        .expect(403, 'Flashband not found.')
        .set('Authorization', 'Token token='.concat(serialToken))
        .end(done);
    });

    it('should reject duplicated flashband', function (done) {
      var verifyDuplicated = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/enter')
          .send({tag: entrance.tag})
          .expect(403, 'Duplicated entrance.')
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fdHelp.createEntrance().then(verifyDuplicated).fail(done);
    });

    it('should reject blocked flashband', function (done) {
      var verifyFlashBandBlocked = function(flashBlocked ) {
        request(sails.hooks.http.app)
          .post('/frontdoor/enter')
          .send({tag: flashBlocked.tag})
          .expect(403, 'Blocked flashband.')
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fbHelp.createBlocked().then(verifyFlashBandBlocked);
    });
  });
});
