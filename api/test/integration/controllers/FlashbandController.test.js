var request      = require('supertest');
var shared       = require('../shared-specs');
var passwordHash = require('password-hash');
var FlashbandHelper = require('../../helpers/FlashbandHelper');
var databaseHelper = require('../../helpers/DatabaseHelper');

describe('FlashbandController', function() {

  var serialToken;

  shared.shoudRequestNotFound('/flashband/000000000000/block', ['GET', 'POST', 'DELETE']);
  //shared.shoudRequestNotFound('/flashband/enable', ['PUT', 'DELETE']);

  describe('with authenticated user', function() {
    beforeEach(function(done) {
      User.create({password: '123123123'}).exec(function(err, user) {
        if (err) return done(err);
        serialToken = passwordHash.generate(user.id);
        user.tokens.add({ token: serialToken });
        user.save().then(function() {
          databaseHelper.emptyModels([Flashband, FlashbandBatch]).then(done).fail(done);
        });
      });
    });

    describe('PUT /flashband/{tag}/block', function() {
      it ('should block an existing flashband', function(done) {
        FlashbandHelper.createSuccess().then(function(validFlashband) {
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
        FlashbandHelper.createBlocked().then(function(validFlashband) {
          request(sails.hooks.http.app)
            .put('/flashband/' + validFlashband.tag + '/block')
            .expect(403, 'Flashband already blocked.')
            .set('Authorization', 'Token token='.concat(serialToken))
            .end(done);
        }).fail(done);
      });
    });
    describe('POST /flashband/enable', function() {
      it ('should enable flashbands from valid file', function(done) {
        request(sails.hooks.http.app)
          .post('/flashband/enable')
          .attach('flashbands', 'test/fixtures/one-valid-flashband.csv')
          .send({name: '1st flashband batch'})
          .set('Authorization', 'Token token='.concat(serialToken))
          .expect(201, { flashbands_enabled: 1, message: 'Flashbands enabled successfully.' })
          .expect('Content-Type', /application\/json/)
          .end(done);
      });
      it ('should reject corrupted file (flashband without UID) ', function(done) {
        request(sails.hooks.http.app)
          .post('/flashband/enable')
          .attach('flashbands', 'test/fixtures/flashband-without-uid.csv')
          .send({name: '1st flashband batch'})
          .set('Authorization', 'Token token='.concat(serialToken))
          .expect(400)
          .expect('Content-Type', /application\/json/)
          .end(done);
      });
    });

    describe('GET /flashband/enable', function() {
      it('should return total of enabled flashbands', function(done) {
        FlashbandHelper.createSuccess().then(function(flashband) {
          request(sails.hooks.http.app)
            .get('/flashband/enable')
            .set('Authorization', 'Token token='.concat(serialToken))
            .expect(200, { total: 1 })
            .expect('Content-Type', /application\/json/)
            .end(done);
        }).fail(done);
      });
    });
  });

});
