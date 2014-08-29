var Q = require('q');

module.exports = function(passW) {
  var deferred = Q.defer();

  User.findOne({password: passW}, function(err, user) {
    if (err)   return deferred.reject(err);
    if (!user) return deferred.reject(new Error('Authentication Unauthorized'));

    deferred.resolve(user);
  });

  return deferred.promise;
};