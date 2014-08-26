var Q = require('q');
var bcrypt = require('bcryptjs');

var loadUserByPass = function(passW) {
  var deferred = Q.defer();

  User.findOne({password: passW}, function(err, user) {
    if (err)   return deferred.reject(err);
    if (!user) return deferred.reject(new Error("Authentication Unauthorized"));

    deferred.resolve(user);
  });

  return deferred.promise;
};

module.exports = {
  login: function(password) {
    var deferred = Q.defer();

    loadUserByPass(password).then(function(user) {
      var args = {
        token: bcrypt.hashSync(user.id.concat(new Date().toISOString()), 8)
      };

      user.tokens.add(args);
      deferred.resolve(args);
    }).fail(function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }
};
