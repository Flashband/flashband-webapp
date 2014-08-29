var request      = require('supertest');
var shared       = require('../shared-specs');
var passwordHash = require('password-hash');
var FlashbandHelper = require('../../helpers/FlashbandHelper');

var args;
var serialToken;

describe('FrontdoorController', function() {
  shared.shoudRequestNotFound('/frontdoor/enter', ['GET', 'PUT', 'DELETE']);

  describe('POST /frontdoor/enter', function() {
    beforeEach(function(done) {
      args = {tag: '1234'};

      User.create({password: '123123123'}, function(err, user) {
        serialToken = passwordHash.generate(user.id);
        user.tokens.add({ token: serialToken });
        user.save(done);
      });
    });

    it('should register a valid flashband', function (done) {
      Flashband.create({tag: '1234', serial: 1}, function() {
        request(sails.hooks.http.app)
          .post('/frontdoor/enter')
          .send({tag: args.tag})
          .expect(201)
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      });
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
      Entrance.create({flb: args.tag}, function(err, entranceModel) {
        request(sails.hooks.http.app)
          .post('/frontdoor/enter')
          .send({tag: args.tag})
          .expect(403, 'Duplicated entrance.')
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      });
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

      FlashbandHelper.createBlocked().then(verifyFlashBandBlocked, done);
    });
  });
});