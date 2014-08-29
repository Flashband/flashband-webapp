var Q = require('q');

module.exports = {
  exists: function(flashbandUid) {
    var deferred = Q.defer();

    Flashband.count({ tag: flashbandUid }).exec(function(err, count) {
      deferred.resolve(!err && !!count && count > 0);
    });

    return deferred.promise;
  }
};
