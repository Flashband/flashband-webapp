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
    sails.models[index].drop();
  }
  done();
});

after(function(done) {
  sails.lower(done);
});
