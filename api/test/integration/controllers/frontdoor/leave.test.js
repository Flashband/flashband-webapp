'use strict';

var request = require('supertest');
var pwHash  = require('password-hash');
var shared  = require('../../shared-specs');
var fdHelp  = require('../../../helpers/FrontdoorHelper');
var sgHelp  = require('../../../helpers/ShowgoerHelper');
var dbHelp  = require('../../../helpers/DatabaseHelper');
var expect = require('chai').use(require('chai-as-promised')).expect;

var outputSuccessful;
var serialToken;

describe('FrontdoorController /frontdoor/leave', function() {

  shared.shoudRequestNotFound('/frontdoor/leave', ['GET', 'PUT', 'DELETE']);

  describe('POST', function() {
    beforeEach(function(done) {
      dbHelp.emptyModels([Entrance, Flashband, Showgoer]).then(function() {
        outputSuccessful = {door: 'out', message: 'Output successful.', showgoer: null};

        User.create({password: '123123123'}).then(function(user) {
          serialToken = pwHash.generate(user.id);
          user.tokens.add({ token: serialToken });
          user.save(done);
        }).fail(done);
      }).fail(done);
    });

    it('should leave a valid flashband', function (done) {
      var verifyLeave = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/leave')
          .send({tag: entrance.tag})
          .expect('Content-type', /application\/json/)
          .expect(201, outputSuccessful)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fdHelp.createEntrance().then(verifyLeave).fail(done);
    });

    it('should include showgoer when leave a valid flashband', function (done) {
      var entrance;
      var verifyLeave = function() {
        request(sails.hooks.http.app)
          .post('/frontdoor/leave')
          .send({tag: entrance.tag})
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body).to.have.property('showgoer').and.have.property('name', 'Fulano de Tal');
            done();
          });
      };

      fdHelp.createEntrance().then(function(e) {
        entrance = e;
        sgHelp.create().then(function(showgoer) {
          ShowgoerService.associate(showgoer.id, entrance.tag).then(verifyLeave).fail(done);
        }).fail(done);
      }).fail(done);
    });

    it('should reject a invalid flashband', function (done) {
      request(sails.hooks.http.app)
        .post('/frontdoor/leave')
        .send({tag: '123123123123'})
        .expect(403, 'Flashband not found.')
        .set('Authorization', 'Token token='.concat(serialToken))
        .end(done);
    });

    it('should reject blocked flashband', function (done) {
      var verifyFlashBandBlocked = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/leave')
          .send({tag: entrance.tag})
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
          .send({tag: entrance.tag})
          .expect(403, 'Duplicated exit.')
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fdHelp.createLeave().then(verifyDuplicated).fail(done);
    });
  });
});
