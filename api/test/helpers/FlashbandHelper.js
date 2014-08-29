var Q = require('q');
var promiseTarget = require('./PromiseTarget');

module.exports = {
  createBlocked: function() {
    var deferred = Q.defer();
    var d = new Date();
    var randonTag = ''.concat(d.getTime());
    var args = {tag: randonTag, serial: 1, blockedAt: new Date()};

    Flashband.create(args).then(deferred.resolve, deferred.reject);

    return promiseTarget(deferred);
  },

  createSuccess: function(expect) {
    var deferred = Q.defer();
    var d = new Date();
    var randonTag = ''.concat(d.getTime());
    var args = {tag: randonTag, serial: 1, blockedAt: null};

    Flashband.create(args).then(deferred.resolve, deferred.reject);

    return promiseTarget(deferred);
  }
};
