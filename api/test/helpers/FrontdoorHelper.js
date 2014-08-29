var Q = require('q');
var promiseTarget = require('./PromiseTarget');
var FlashbandHelper = require('./FlashbandHelper');

module.exports = {
  createEntrance: function() {
    var deferred = Q.defer();

    FlashbandHelper.createSuccess().then(function(flashSuccess) {
      Entrance.create({tag: flashSuccess.tag}).then(deferred.resolve);
    });

    return promiseTarget(deferred);
  },

  createEntranceAndBlocked: function() {
    var deferred = Q.defer();

    this.createEntrance().then(function(entrance) {
      Flashband.findOne({tag: entrance.tag}).then(function(flashband) {
        flashband.blockedAt = new Date();
        flashband.save(function(err, mdl) {
          deferred.resolve(mdl);
        });
      });
    });

    return promiseTarget(deferred);
  },

  createLeave: function() {
    var deferred = Q.defer();

    var leave = function(entrance) {
      entrance.leave = new Date();
      entrance.save(function(err, mdl) {
        deferred.resolve(mdl);
      });
    };

    this.createEntrance().then(leave);

    return promiseTarget(deferred);
  }
};
