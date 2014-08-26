var Q = require('q');

module.exports = {
  register: function(flashbandUid) {
    var deferred = Q.defer();
    var args = { flashband: flashbandUid };

    this.validateBeforeRegister(flashbandUid).then(function(results) {
      if (results.numberNotImported)      return deferred.reject('Flashband not found.');
      if (results.entranceEverRegistered) return deferred.reject('Duplicated entrance.');

      Entrance.create(args, function(err, entranceModel) {
        deferred.resolve(entranceModel);
      });
    });

    return deferred.promise;
  },

  validateBeforeRegister: function(flashbandUid) {
    var deferred = Q.defer();

    async.series({
        numberNotImported: function(callback){
          FlashbandService.exists(flashbandUid).then(function(exist) {
            callback(null, !exist);
          });
        },
        entranceEverRegistered: function(callback) {
          EntranceService.checkRegistered(flashbandUid).then(function(registered) {
            callback(null, registered);
          });
        }
    },
    function(err, results) {
      deferred.resolve(results);
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
