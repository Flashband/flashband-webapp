var Q = require('q');

var _validateBeforeRegister = function(flashbandUid) {
  var deferred = Q.defer();

  async.series({
    flashbandNotImported: function(callback){
      FlashbandService.exists(flashbandUid).then(function(exists) {
        callback(null, !exists);
      });
    },
    entranceAlreadyRegistered: function(callback) {
      EntranceService.checkRegistered(flashbandUid).then(function(registered) {
        callback(null, registered);
      });
    },
    blockedFlashband: function(callback) {
      Flashband.findOne({uid: flashbandUid}).then(function(flashband) {
        callback(null, flashband ? flashband.blocked() : false);
      });
    }
  },
  function(err, results) {
    deferred.resolve(results);
  });
  return deferred.promise;
};

  module.exports = {
    register: function(flashbandUid) {
      var deferred = Q.defer();
      var args = { flashband: flashbandUid };
      _validateBeforeRegister(flashbandUid).then(function(results) {
        if (results.flashbandNotImported)       return deferred.reject('Flashband not found.');
        if (results.entranceAlreadyRegistered)  return deferred.reject('Duplicated entrance.');
        if (results.blockedFlashband)           return deferred.reject('Blocked flashband.');
        Entrance.create(args, function(err, entranceModel) {
          deferred.resolve(entranceModel);
        });
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
