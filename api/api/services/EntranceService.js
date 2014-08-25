var Q = require('q');

module.exports = {
  register: function(flashbandUid, callback) {
    var deferred = Q.defer();
    var args = { flashband: flashbandUid };

    Entrance.create(args, function(err, entranceModel) {
      deferred.resolve(entranceModel);
    });

    return deferred.promise;
  },

  checkRegistered: function(flashbandUid) {
    var deferred = Q.defer();
    var args = { flashband: flashbandUid };

    Entrance.count(args, function(err, count) {
      deferred.resolve(count != null && count > 0);
    });

    return deferred.promise;
  }
};
