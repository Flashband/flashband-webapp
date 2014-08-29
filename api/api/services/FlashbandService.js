var Q = require('q');

module.exports = {
  exists: function(flashbandUid) {
    var deferred = Q.defer();

    Flashband.count({ tag: flashbandUid }).exec(function(err, count) {
      deferred.resolve(!err && !!count && count > 0);
    });

    return deferred.promise;
  },
  block: function(flashbandUid) {
    var deferred = Q.defer();
    Flashband.findOne({ uid: flashbandUid }).then(function(flashband) {
      flashband.blockedAt = new Date();
      flashband.save().then(function(savedFlashband) {
        deferred.resolve(savedFlashband);
      });
    });
    return deferred.promise;
  }
};
