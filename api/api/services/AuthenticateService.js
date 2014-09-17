var Q = require('q');
var tokenHasher = require('password-hash');

module.exports = {
  login: function(password) {
    var deferred = Q.defer();

    var generateToken = function(user) {
      var args = {
        token: tokenHasher.generate(user.id),
        user: user
      };

      user.tokens.add(args);
      user.save(function() {
        deferred.resolve(args);
      });
    };

    User.findOne({mobpassword: password}).then(generateToken).fail(deferred.reject);

    return deferred.promise;
  },

  checkTokenValid: function(accessToken) {
    var deferred = Q.defer();

    if (accessToken && tokenHasher.isHashed(accessToken)) {
      var resolve = function(err, theToken) {
        if (err)       return deferred.resolve(false);
        if (!theToken) return deferred.resolve(false);

        deferred.resolve(theToken.token === accessToken);
      };

      Token.findOne({token: accessToken}).exec(resolve);
    } else {
      deferred.resolve(false);
    }

    return deferred.promise;
  }
};
