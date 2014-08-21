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
  for (var index in sails.models) {
    model = sails.models[index];
    model.drop();
  }
  done();
});

after(function(done) {
  sails.lower(done);
});
