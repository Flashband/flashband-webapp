var request      = require('supertest');
var shared       = require('../shared-specs');
var passwordHash = require('password-hash');
var FlashbandHelper = require('../../helpers/FlashbandHelper');

describe('FlashbandController', function() {

  var serialToken;

  shared.shoudRequestNotFound('/flashband/000000000000/block', ['GET', 'POST', 'DELETE']);
  shared.shoudRequestNotFound('/flashband/enable', ['GET', 'PUT', 'DELETE']);

  describe('with authenticated user', function() {
    beforeEach(function(done) {
      User.create({password: '123123123'}).then(function(user) {
        serialToken = passwordHash.generate(user.id);
        user.tokens.add({ token: serialToken });
        user.save(done);
      }).fail(done);
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
      it ('return received content', function(done) {
        var fileContent = [ { tag: '110011', serial: '1' }, { tag:'220022', serial: 2 } ];
        request(sails.hooks.http.app)
          .post('/flashband/enable')
          .send(fileContent)
          .set('Authorization', 'Token token='.concat(serialToken))
          .expect(201, { message: 'Flashbands enabled successfully.' })
          .expect('Content-Type', /application\/json/)
          .end(done);
      });
    });
  });

});
