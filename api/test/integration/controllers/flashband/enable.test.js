'use strict';

var request = require('supertest');
var shared  = require('../../shared-specs');
var pwHash  = require('password-hash');
var fbHelp  = require('../../../helpers/FlashbandHelper');
var dbHelp  = require('../../../helpers/DatabaseHelper');
var expect  = require('chai').use(require('chai-as-promised')).expect;

describe('FlashbandController', function() {
  var serialToken;

  shared.shoudRequestNotFound('/flashband/enable', ['PUT', 'DELETE']);

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

    describe('POST /flashband/enable', function() {
      var importBatch;

      beforeEach(function(done) {
        importBatch = function(nameBatch, attachFile) {
          return request(sails.hooks.http.app)
            .post('/flashband/enable')
            .attach('flashbands', 'test/fixtures/'.concat(attachFile))
            .send({name: nameBatch})
            .set('Authorization', 'Token token='.concat(serialToken));
        };

        done();
      });

      it ('should enable flashbands from valid file', function(done) {
        importBatch('1st flashband batch', 'one-valid-flashband.csv')
          .expect('Content-type', /application\/json/)
          .expect(201, { flashbandsEnabled: 1, message: 'Flashbands enabled successfully.' })
          .end(done);
      });

      it ('should reject corrupted file (flashband without UID) ', function(done) {
        importBatch('2st flashband batch', 'flashband-without-uid.csv')
          .expect('Content-type', /application\/json/)
          .expect(400)
          .end(done);
      });

      it ('should delete old flashbands when enable a new batch', function(done) {
        var flashbandNumber = '8028533A0A8304';

        importBatch('3st flashband batch', 'one-valid-flashband.csv').end(function() {
          expect(FlashbandService.exists(flashbandNumber)).to.eventually.have.property('tag', flashbandNumber).and.notify(function() {
            importBatch('4st flashband batch', 'two-valid-flashband.csv').end(function() {
              expect(FlashbandService.exists(flashbandNumber)).to.be.rejectedWith('Flashband not found').and.notify(done);
            });
          });
        });
      });
    });

    describe('GET /flashband/enable', function() {
      it('should return total of enabled flashbands', function(done) {
        fbHelp.createSuccess().then(function() {
          request(sails.hooks.http.app)
            .get('/flashband/summary')
            .set('Authorization', 'Token token='.concat(serialToken))
            .expect(200, { total: 1 })
            .expect('Content-Type', /application\/json/)
            .end(done);
        }).fail(done);
      });
    });
  });
});
