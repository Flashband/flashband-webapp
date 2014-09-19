var Sails = require('sails');
var databaseHelper = require('./helpers/DatabaseHelper');

before(function(done) {
  Sails.lift({
    silent: true,
    models: {
      migrate: 'drop'
    }
  }, done);
});

beforeEach(function(done) {
  databaseHelper.emptyModels(sails.models).finally(done);
});

after(function(done) {
  sails.lower(done);
});
