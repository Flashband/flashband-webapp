var Sails = require('sails');
var async = require('async');

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
  async.each(sails.models, function(model, next) {
    Q(model.drop()).then(next, done);
  }, done);
});

after(function(done) {
  sails.lower(done);
});
