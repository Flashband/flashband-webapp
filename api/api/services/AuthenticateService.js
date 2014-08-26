var Q = require('q');
var passwordHash = require('password-hash');

var loadUser = function(nickname) {
  var deferred = Q.defer();

  User.findOne({nickname: nickname}, function(err, user) {
    if (err) return deferred.reject(err);
    deferred.resolve(user);
  });

  return deferred.promise;
};

module.exports = {
  login: function(nickname, password) {
    var deferred = Q.defer();

    loadUser(nickname).then(function(user) {
      if (!passwordHash.verify(password, user.password)) return deferred.reject('Authenticate unauthorized.');

      var argToken = {
        rehash: passwordHash.generate(user.id.concat(new Date().toISOString()))
      };

      user.tokens.add(argToken);
      deferred.resolve(argToken);
    }).fail(function(error) {
      deferred.reject(err);
    });

    return deferred.promise;
  }
};
