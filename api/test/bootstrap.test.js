var Sails = require('sails');
var databaseHelper = require('./helpers/DatabaseHelper');

before(function(done) {
  Sails.lift({
    silent: true,
    models: {
      migrate: 'drop'
    }
  }, function(err, sails) {
    if (err) return done(err);
    done(err, sails);
  });
});

beforeEach(function(done) {
  databaseHelper.emptyModels(sails.models, done);
});

after(function(done) {
  sails.lower(done);
});
