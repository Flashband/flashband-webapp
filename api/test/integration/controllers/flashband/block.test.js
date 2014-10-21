'use strict';

var request = require('supertest');
var shared  = require('../../shared-specs');
var pwHash  = require('password-hash');
var fbHelp  = require('../../../helpers/FlashbandHelper');
var dbHelp  = require('../../../helpers/DatabaseHelper');

describe('FlashbandController', function() {
  var serialToken;

  shared.shoudRequestNotFound('/flashband/{flashband.tag}/block', ['GET', 'POST', 'DELETE']);

  describe('with authenticated user', function() {
    beforeEach(function(done) {
      User.create({password: '123123123'}).exec(function(err, user) {
        if (err) { return done(err); }
        serialToken = pwHash.generate(user.id);
        user.tokens.add({ token: serialToken });
        user.save().then(function() {
          dbHelp.emptyModels([Flashband, FlashbandBatch]).then(done).fail(done);
        });
      });
    });

    describe('PUT /flashband/{tag}/block', function() {
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
});
