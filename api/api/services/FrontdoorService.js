var Q = require('q');
var validateBeforeRegister = require('./ValidateBeforeRegister');

module.exports = {
  registerEnter: function(flashbandUid) {
    var deferred = Q.defer();

    var registerEntrance = function(results) {
      if (!results.flashbandImported)   return deferred.reject('Flashband not found.');
      if (results.blockedFlashband)     return deferred.reject('Blocked flashband.');
      if (results.entranceAlreadyIn)    return deferred.reject('Duplicated entrance.');

      Entrance.create({ tag: flashbandUid }, function(err, entranceModel) {
        deferred.resolve(entranceModel);
      });
    };

    validateBeforeRegister.enter(flashbandUid).then(registerEntrance);

    return deferred.promise;
  },

  registerLeave: function(flashbandUid) {
    var deferred = Q.defer();

    var registerLeave = function(results) {
      if (!results.flashbandImported)    return deferred.reject('Flashband not found.');
      if (results.blockedFlashband)      return deferred.reject('Blocked flashband.');
      if (results.flashbandWithoutEntry) return deferred.reject('Flashband without entry.');

      Entrance.findOne({ tag: flashbandUid }).exec(function(err, entranceModel) {
        entranceModel.leave = new Date();
        entranceModel.save(function() {
          deferred.resolve(entranceModel);
        });
      });
    };

    validateBeforeRegister.leave(flashbandUid).then(registerLeave);

    return deferred.promise;
  },

  checkRegistered: function(flashbandUid) {
    var deferred = Q.defer();

    Entrance.count({ tag: flashbandUid, leave: null }, function(err, count) {
      deferred.resolve(!err && count > 0);
    });

    return deferred.promise;
  }
};