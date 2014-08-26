var Q = require('q');

module.exports = {
  register: function(flashbandUid) {
    var deferred = Q.defer();
    var args = { flashband: flashbandUid };

    Q(FlashbandService.exists(flashbandUid)).then(function(flashbandExists) {
      if (!flashbandExists) return deferred.reject('Flashband not found.');
    });

    Q(this.checkRegistered(flashbandUid)).then(function(registered) {
      if (registered) return deferred.reject('Duplicated entrance.');

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
