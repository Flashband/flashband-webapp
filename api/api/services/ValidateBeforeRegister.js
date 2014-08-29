var Q = require('q');

module.exports = {
  enter: function(flashbandUid) {
    var deferred = Q.defer();

    async.series({
      flashbandImported: function(callback){
        FlashbandService.exists(flashbandUid).then(function(exists) {
          callback(null, exists);
        });
      },
      entranceAlreadyIn: function(callback) {
        FrontdoorService.checkRegistered(flashbandUid).then(function(registered) {
          callback(null, registered);
        });
      },
      blockedFlashband: function(callback) {
        Flashband.findOne({tag: flashbandUid}).then(function(flashband) {
          callback(null, flashband ? flashband.blocked() : false);
        });
      }
    }, function(err, results) {
      deferred.resolve(results);
    });

    return deferred.promise;
  },

  leave: function(flashbandUid) {
    var deferred = Q.defer();

    async.series({
      flashbandImported: function(callback){
        FlashbandService.exists(flashbandUid).then(function(exists) {
          callback(null, exists);
        });
      },
      entranceAlreadyOut: function(callback) {
        Entrance.findOne({tag: flashbandUid, leave: null}).exec(function(err, found) {
          callback(null, !found);
        });
      },
      blockedFlashband: function(callback) {
        Flashband.findOne({tag: flashbandUid}).then(function(flashband) {
          callback(null, flashband ? flashband.blocked() : false);
        });
      }
    }, function(err, results) {
      deferred.resolve(results);
    });

    return deferred.promise;
  }
};