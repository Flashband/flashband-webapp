//var request      = require('supertest');
//var shared       = require('../shared-specs');
//var passwordHash = require('password-hash');
//var FlashbandHelper = require('../../helpers/FlashbandHelper');
//
//describe('FlashbandController', function() {
//
//  var serialToken;
//
//  describe('#block', function() {
//    beforeEach(function(done) {
//      User.create({password: '123123123'}, function(err, user) {
//        serialToken = passwordHash.generate(user.id);
//        user.tokens.add({ token: serialToken });
//        user.save(done);
//      }, done);
//    });
//
//    shared.shoudRequestNotFound('/flashband/block', ['GET', 'PUT', 'DELETE']);
//
//    it ('should block an existing flashband', function(done) {
//      FlashbandHelper.createSuccess().then(function(validFlashband) {
//        request(sails.hooks.http.app)
//        .post('/flashband/block')
//        .send({tag: validFlashband.tag})
//        .expect(200, { message: 'Flashband blocked.' })
//        .set('Authorization', 'Token token='.concat(serialToken))
//        .end(done);
//      }, done);
//    });
//    
//    it('should not found a non existing flashband', function(done) {
//      request(sails.hooks.http.app)
//        .post('/flashband/block')
//        .send({tag: 'non-existing'})
//        .expect(403, 'Flashband not found.')
//        .set('Authorization', 'Token token='.concat(serialToken))
//        .end(done);
//    });
//  });
//});
