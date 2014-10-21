'use strict';

var request = require('supertest');
var shared  = require('../../shared-specs');
var fbHelp  = require('../../../helpers/FlashbandHelper');
var fbShared = require('./shared');

describe('FlashbandController /flashband/{flashband.tag}/block', function() {
  var serialToken;
  var getSerialToken = function(st) {
    serialToken = st;
  };

  shared.shoudRequestNotFound('/flashband/{flashband.tag}/block', ['GET', 'POST', 'DELETE']);

  describe('PUT', function() {
    beforeEach(fbShared.handleSerialToken(getSerialToken));

    it ('should block an existing flashband', function(done) {
      fbHelp.createSuccess().then(function(validFlashband) {
        request(sails.hooks.http.app)
          .put('/flashband/' + validFlashband.tag + '/block')
          .expect(200, { message: 'Flashband blocked.' })
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      }).fail(done);
    });

    it('should not found a non existing flashband', function(done) {
      request(sails.hooks.http.app)
        .put('/flashband/000000000000/block')
        .expect(403, 'Flashband not found.')
        .set('Authorization', 'Token token='.concat(serialToken))
        .end(done);
    });

    it('should not found an already blocked flashband', function(done) {
      fbHelp.createBlocked().then(function(validFlashband) {
        request(sails.hooks.http.app)
          .put('/flashband/' + validFlashband.tag + '/block')
          .expect(403, 'Flashband already blocked.')
          .set('Authorization', 'Token token='.concat(serialToken))
          .end(done);
      }).fail(done);
    });
  });
});
