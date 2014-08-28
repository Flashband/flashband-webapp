var Q = require('q');
var validateBeforeRegister = require('./ValidateBeforeRegister');

module.exports = {
  registerEnter: function(flashbandUid) {
    var deferred = Q.defer();

    validateBeforeRegister.enter(flashbandUid).then(function(results) {
      if (results.flashbandNotImported)      return deferred.reject('Flashband not found.');
      if (results.blockedFlashband)          return deferred.reject('Blocked flashband.');
      if (results.entranceAlreadyRegistered) return deferred.reject('Duplicated entrance.');

      Entrance.create({ tag: flashbandUid }, function(err, entranceModel) {
        deferred.resolve(entranceModel);
      });
    });

    return deferred.promise;
  },

  registerLeave: function(flashbandUid) {
    var deferred = Q.defer();

    validateBeforeRegister.leave(flashbandUid).then(function(results) {
      Entrance.create(args, function(err, entranceModel) {
        deferred.resolve(entranceModel);
      });
    });

    return deferred.promise;
  },

  checkRegistered: function(flashbandUid) {
    var deferred = Q.defer();
    var args = { tag: flashbandUid };

    Entrance.count(args, function(err, count) {
      deferred.resolve(!err && count > 0);
    });

    return deferred.promise;
  }
};