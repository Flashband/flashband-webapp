var Q = require('q');

module.exports = {
  register: function(flashbandUid, callback) {
    var deferred = Q.defer();
    var args = { flashband: flashbandUid };

    this.checkRegistered(flashbandUid).done(function(registered) {
      if (registered) {
        deferred.reject(new Error('Duplicated entrance.'));
      } else {
        Entrance.create(args, function(err, entranceModel) {
          deferred.resolve(entranceModel);
        });
      }
    });

    return deferred.promise;
  },

  checkRegistered: function(flashbandUid) {
    var deferred = Q.defer();
    var args = { flashband: flashbandUid };

    Entrance.count(args, function(err, count) {
      deferred.resolve(!err && count > 0);
    });

    return deferred.promise;
  }
};
