var Q = require('q');
var tokenHasher = require('password-hash');
var loadUserByPass = require('./LoadUserByPass');

module.exports = {
  login: function(password) {
    var deferred = Q.defer();

    var generateToken = function(user) {
      var args = {
        token: tokenHasher.generate(user.id)
      };

      user.tokens.add(args);
      user.save(function() {
        deferred.resolve(args);
      });
    };

    loadUserByPass(password).then(generateToken).fail(function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  },

  checkTokenValid: function(accessToken) {
    var deferred = Q.defer();

    if (!accessToken) {
      deferred.resolve(false);
      return deferred.promise;
    }

    if (!tokenHasher.isHashed(accessToken)) {
      deferred.resolve(false);
      return deferred.promise;
    }

    Token.findOne({token: accessToken}).exec(function(err, theToken) {
      if (err)    return deferred.resolve(false);
      if (!theToken) return deferred.resolve(false);

      deferred.resolve(theToken.token === accessToken);
    });

    return deferred.promise;
  }
};
