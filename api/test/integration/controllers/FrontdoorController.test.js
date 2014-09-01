var request      = require('supertest');
var shared       = require('../shared-specs');
var passwordHash = require('password-hash');
var FlashbandHelper = require('../../helpers/FlashbandHelper');
var FrontdoorHelper = require('../../helpers/FrontdoorHelper');

var outputSuccessful;
var inputSuccessful;
var args;
var serialToken;

describe('FrontdoorController', function() {
  shared.shoudRequestNotFound('/frontdoor/enter', ['GET', 'PUT', 'DELETE']);
  shared.shoudRequestNotFound('/frontdoor/leave', ['GET', 'PUT', 'DELETE']);

  beforeEach(function(done) {
    args = {tag: '1234'};
    Entrance.drop();
    Flashband.drop();
    inputSuccessful  = {door: "in", message: "Input successful."};
    outputSuccessful = {door: "out", message: "Output successful."};

    User.create({password: '123123123'}, function(err, user) {
      serialToken = passwordHash.generate(user.id);
      user.tokens.add({ token: serialToken });
      user.save(done);
    });
  });

  describe('POST /frontdoor/enter', function() {
    it('should register a valid flashband', function (done) {
      var verifyRegister = function(flashband) {
        request(sails.hooks.http.app)
          .post('/frontdoor/enter')
          .send({tag: flashband.tag})
          .expect(201, inputSuccessful)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      FlashbandHelper.createSuccess().then(verifyRegister);
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

      FrontdoorHelper.createEntrance().then(verifyDuplicated, done);
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

      FlashbandHelper.createBlocked().then(verifyFlashBandBlocked);
    });
  });

  describe('POST /frontdoor/leave', function() {
    it('should leave a valid flashband', function (done) {
      var verifyLeave = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/leave')
          .send({tag: entrance.tag})
          .expect(201, outputSuccessful)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      FrontdoorHelper.createEntrance().then(verifyLeave, done);
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

      FrontdoorHelper.createEntranceAndBlocked().then(verifyFlashBandBlocked, done);
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

      FrontdoorHelper.createLeave().then(verifyDuplicated, done);
    });
  });

  describe('POST /frontdoor/cross', function() {
    it('should register a valid flashband', function (done) {
      var verifyRegister = function(flashband) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: flashband.tag})
          .expect(201, inputSuccessful)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      FlashbandHelper.createSuccess().then(verifyRegister);
    });

    it('should leave a valid flashband', function (done) {
      var verifyLeave = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag})
          .expect(201, outputSuccessful)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      FrontdoorHelper.createEntrance().then(verifyLeave, done);
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

      FrontdoorHelper.createEntranceAndBlocked().then(verifyFlashBandBlocked, done);
    });

    it('should register a valid flashband after exit', function (done) {
      var verifyRegister = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag})
          .expect(201, inputSuccessful)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      };

      FrontdoorHelper.createLeave().then(verifyRegister);
    });

    it('should register output after entering 2x', function (done) {
      var verifyRegister = function(entrance) {
        request(sails.hooks.http.app)
          .post('/frontdoor/cross')
          .send({tag: entrance.tag})
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(function() {
            request(sails.hooks.http.app)
              .post('/frontdoor/cross')
              .send({tag: entrance.tag})
              .expect(201, outputSuccessful)
              .set('Authorization', 'Token token='.concat(serialToken))
              .end(done);
          });
      };

      FrontdoorHelper.createLeave().then(verifyRegister);
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
                  .expect(201, inputSuccessful)
                  .set('Authorization', 'Token token='.concat(serialToken))
                  .end(done);
              });
          });
      };

      FrontdoorHelper.createLeave().then(verifyRegister);
    });
  });
});
