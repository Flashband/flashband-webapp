var Q = require('q');
var promiseTarget = require('./PromiseTarget');

module.exports = {
  createBlocked: function() {
    var deferred = Q.defer();

    Flashband.create({tag: '3456', serial: 1, blockedAt: new Date()}).then(function(flash) {
      deferred.resolve(flash);
    }).fail(function(error) {
      deferred.reject(error);
    });

    return promiseTarget(deferred);
  },
  createSuccess: function(expect) {
    var deferred = Q.defer();

    Flashband.create({tag: '4567', serial: 1, blockedAt: null}).then(function(flash) {
      deferred.resolve(flash);
    }).fail(function(error) {
      deferred.reject(error);
    });

    return promiseTarget(deferred);
  }
};
