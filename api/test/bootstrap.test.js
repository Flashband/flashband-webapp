'use strict';

var Sails = require('sails');

before(function(done) {
  Sails.lift({
    silent: true,
    models: {
      migrate: 'drop'
    }
  }, done);
});

after(function(done) {
  sails.lower(done);
});
