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

    var registerExit = function(results) {
      if (!results.imported)  return deferred.reject('Flashband not found.');
      if (results.blocked)    return deferred.reject('Blocked flashband.');
      if (results.alreadyOut) return deferred.reject('Duplicated exit.');

      Entrance.findOne({ tag: flashbandUid, leave: null }, function(err, entranceModel) {
        entranceModel.leave = new Date();
        entranceModel.save(function(err, mdl) {
          deferred.resolve(mdl);
        });
      });
    };

    validateBeforeRegister.leave(flashbandUid).then(registerExit);

    return deferred.promise;
  },

  checkRegistered: function(flashbandUid) {
    var deferred = Q.defer();

    Entrance.findOne({ tag: flashbandUid, leave: null }, function(err, found) {
      deferred.resolve(found != null);
    });

    return deferred.promise;
  },

  checkAlreadyOut: function(flashbandUid) {
    var deferred = Q.defer();

    Entrance.findOne({ tag: flashbandUid, leave: null }, function(err, found) {
      deferred.resolve(found == null);
    });

    return deferred.promise;
  }
};