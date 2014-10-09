'use strict';

var Q = require('q');
var tokenHasher = require('password-hash');

var auth = function(argsFind) {
  var generateToken = function(user) {
    if (!user) { throw new Error('user not found'); }

    var args = {
      token: tokenHasher.generate(user.id)
    };

    user.tokens.add(args);
    return user.save().then(function() {
      args.user = user;
      return args;
    });
  };

  return User.findOne(argsFind).then(generateToken);
};

module.exports = {
  webLogin: function(email, password) {
    return auth({email: email, webpassword: password});
  },

  mobileLogin: function(password) {
    return auth({mobpassword: password});
  },

  checkTokenValid: function(accessToken) {
    var deferred = Q.defer();

    if (accessToken && tokenHasher.isHashed(accessToken)) {
      var resolve = function(err, theToken) {
        if (err) { return deferred.resolve(false); }
        if (!theToken) { return deferred.resolve(false); }

        deferred.resolve(theToken.token === accessToken);
      };

      Token.findOne({token: accessToken}).exec(resolve);
    } else {
      deferred.resolve(false);
    }

    return deferred.promise;
  }
};
