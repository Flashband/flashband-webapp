'use strict';

var request = require('supertest');
var shared  = require('../shared-specs');
var pwHash  = require('password-hash');
var fbHelp  = require('../../helpers/FlashbandHelper');
var fdHelp  = require('../../helpers/FrontdoorHelper');
var sgHelp  = require('../../helpers/ShowgoerHelper');
var dbHelp  = require('../../helpers/DatabaseHelper');
var expect = require('chai').use(require('chai-as-promised')).expect;

var outputSuccessful;
var inputSuccessful;
var args;
var serialToken;

describe('FrontdoorController', function() {
  beforeEach(function(done) {
    args = {tag: '1234'};
    dbHelp.emptyModels([Entrance, Flashband]).then(function() {
      inputSuccessful  = {door: 'in', message: 'Input successful.', showgoer: null};
      outputSuccessful = {door: 'out', message: 'Output successful.', showgoer: null};

      User.create({password: '123123123'}).then(function(user) {
        serialToken = pwHash.generate(user.id);
        user.tokens.add({ token: serialToken });
        user.save(done);
      }).fail(done);
    });
  });

  describe('POST /frontdoor/enter', function() {
    shared.shoudRequestNotFound('/frontdoor/enter', ['GET', 'PUT', 'DELETE']);

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

      fdHelp.createEntrance().then(verifyDuplicated, done);
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

  describe('POST /frontdoor/leave', function() {
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

  describe('POST /frontdoor/cross', function() {
    it('should register a valid flashband', function (done) {
      var verifyRegister = function(flashband) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
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
          .post('/frontdoor/cross')
          .send({tag: flashband.tag})
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function(err, response) {
            if (err) {
              done(err);
            } else {
              expect(response.body).to.have.property('showgoer').and.have.property('name', 'Fulano de Tal');
              done();
            }
          });
      };

      fbHelp.createSuccess().then(function(f) {
        flashband = f;
        sgHelp.create().then(function(showgoer) {
          ShowgoerService.associate(showgoer.id, flashband.tag).then(verifyRegister).fail(done);
        });
      });
    });

    it('should leave a valid flashband', function (done) {
      var verifyLeave = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag})
          .expect('Content-type', /application\/json/)
          .expect(201, outputSuccessful)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fdHelp.createEntrance().then(verifyLeave, done);
    });

    it('should include showgoer when leave a valid flashband', function (done) {
      var entrance;
      var verifyLeave = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag})
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function(err, res) {
            if (err) {
              done(err);
            } else {
              expect(res.body).to.have.property('showgoer').and.have.property('name', 'Fulano de Tal');
              done();
            }
          });
      };

      fdHelp.createEntrance().then(function(e) {
        entrance = e;
        sgHelp.create().then(function(showgoer) {
          ShowgoerService.associate(showgoer.id, entrance.tag).then(verifyLeave).fail(done);
        });
      });
    });

    it('should reject a invalid flashband', function (done) {
      request(sails.hooks.http.app)
        .post('/frontdoor/cross')
        .send({tag: '123123123123'})
        .expect(403, 'Flashband not found.')
        .set('Authorization', 'Token token='.concat(serialToken))
        .end(done);
    });

    it('should reject blocked flashband', function (done) {
      var verifyFlashBandBlocked = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag})
          .expect(403, 'Blocked flashband.')
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fdHelp.createEntranceAndBlocked().then(verifyFlashBandBlocked, done);
    });

    it('should register a valid flashband after exit', function (done) {
      var verifyRegister = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag})
          .expect('Content-type', /application\/json/)
          .expect(201, inputSuccessful)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      fdHelp.createLeave().then(verifyRegister);
    });

    it('should register output after entering 2x', function (done) {
      var verifyRegister = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag})
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function(err) {
            if (err) { return done(err); }
            request(sails.hooks.http.app)
              .post('/frontdoor/cross')
              .send({tag: entrance.tag})
              .expect('Content-type', /application\/json/)
              .expect(201, outputSuccessful)
              .set('Authorization', 'Token token='.concat(serialToken))
              .end(done);
          });
      };

      fdHelp.createLeave().then(verifyRegister);
    });

    it('must register the entry after leaving 2x', function (done) {
      var verifyRegister = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag})
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function() {
            request(sails.hooks.http.app)
              .post('/frontdoor/cross')
              .send({tag: entrance.tag})
              .set('Authorization', 'Token token='.concat(serialToken))
              .end(function() {
                request(sails.hooks.http.app)
                  .post('/frontdoor/cross')
                  .send({tag: entrance.tag})
                  .expect('Content-type', /application\/json/)
                  .expect(201, inputSuccessful)
                  .set('Authorization', 'Token token='.concat(serialToken))
                  .end(done);
              });
          });
      };

      fdHelp.createLeave().then(verifyRegister);
    });
  });
});
