var Sails = require('sails');

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
  async.eachSeries(sails.models, function(model, callback) {
    model.drop(callback);
  }, done);
});

after(function(done) {
  sails.lower(done);
});
