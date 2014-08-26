var Q = require('q');

module.exports = {
  login: function(nickname, password) {
    var deferred = Q.defer();
    deferred.resolve({token: "123982381023980938129381"});
    return deferred.promise;
  }
};
