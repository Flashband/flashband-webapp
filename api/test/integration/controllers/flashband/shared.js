'use strict';

var pwHash  = require('password-hash');
var dbHelp  = require('../../../helpers/DatabaseHelper');

var handleSerialToken = function(serialTokenCallback) {
  var serialToken;
  
  return function(done) {
    var emptyModels = function() {
      dbHelp.emptyModels([Flashband, FlashbandBatch]).then(done).fail(done);
    };

    User.create({password: '123123123'}).exec(function(err, user) {
      if (err) { return done(err); }
      serialToken = pwHash.generate(user.id);
      if (serialTokenCallback) serialTokenCallback(serialToken);
      user.tokens.add({ token: serialToken });
      user.save().then(emptyModels);
    });
  };
  
};

module.exports = {
  handleSerialToken: handleSerialToken
};
