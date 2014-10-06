var request      = require('supertest');
var passwordHash = require('password-hash');
var ShowgoerHelper = require('../../helpers/ShowgoerHelper');
var databaseHelper = require('../../helpers/DatabaseHelper');

describe('ShowgoerController', function() {
  var serialToken;

  describe('with authenticated user', function() {
    beforeEach(function(done) {
      User.create({password: '123123123'}).exec(function(err, user) {
        if (err) return done(err);
        serialToken = passwordHash.generate(user.id);
        user.tokens.add({ token: serialToken });
        user.save().then(function() {
          databaseHelper.emptyModels([Showgoer]).then(done).fail(done);
          return;
        });
      });
    });

    describe('GET /showgoer', function() {
      it ('should return http-status 200', function(done) {
        ShowgoerHelper.create().then(function() {
          request(sails.hooks.http.app)
            .get('/showgoer/')
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .set('Authorization', 'Token token='.concat(serialToken))
            .end(done);
        }).fail(done);
      });
    });
  });
});
