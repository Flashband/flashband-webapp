'use strict';

var request = require('supertest');
var shared  = require('../shared-specs');
var pwHash  = require('password-hash');
var fdHelp  = require('../../helpers/FrontdoorHelper');
var dbHelp  = require('../../helpers/DatabaseHelper');

var outputSuccessful;
var serialToken;

describe('FrontdoorController POST /frontdoor/leave', function() {
  beforeEach(function(done) {
    dbHelp.emptyModels([Entrance, Flashband]).then(function() {
      outputSuccessful = {door: 'out', message: 'Output successful.', showgoer: null};

      User.create({password: '123123123'}).then(function(user) {
        serialToken = pwHash.generate(user.id);
        user.tokens.add({ token: serialToken });
        user.save(done);
      }).fail(done);
    });
  });

  shared.shoudRequestNotFound('/frontdoor/leave', ['GET', 'PUT', 'DELETE']);

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

    fdHelp.createEntrance().then(verifyLeave, done);
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

    fdHelp.createEntranceAndBlocked().then(verifyFlashBandBlocked, done);
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

    fdHelp.createLeave().then(verifyDuplicated, done);
  });
});
