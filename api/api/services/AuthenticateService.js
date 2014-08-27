var Q = require('q');
var tokenHasher = require('password-hash');

var loadUserByPass = function(passW) {
  var deferred = Q.defer();

  User.findOne({password: passW}, function(err, user) {
    if (err)   return deferred.reject(err);
    if (!user) return deferred.reject(new Error('Authentication Unauthorized'));

    deferred.resolve(user);
  });

  return deferred.promise;
};

module.exports = {
  login: function(password) {
    var deferred = Q.defer();

    loadUserByPass(password).then(function(user) {
      var args = {
        token: tokenHasher.generate(user.id)
      };

      user.tokens.add(args);
      user.save(function(err) {
        deferred.resolve(args);
      });
    }).fail(function(error) {
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

      console.log("==============");
      console.log(theToken);
      console.log("==============");

      if (err)    return deferred.resolve(false);
      if (!theToken) return deferred.resolve(false);

      deferred.resolve(theToken.token == accessToken);
    });

    return deferred.promise;
  }
};
