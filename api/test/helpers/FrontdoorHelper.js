var Q = require('q');
var promiseTarget = require('./PromiseTarget');
var FlashbandHelper = require('./FlashbandHelper');

module.exports = {
  createEntrance: function() {
    var deferred = Q.defer();

    var returnEntrance = function(err, entranceModel) {
      deferred.resolve(entranceModel);
    };

    var newEntrance = function(flashSuccess) {
      Entrance.create({tag: flashSuccess.tag}, returnEntrance);
    };

    FlashbandHelper.createSuccess().then(newEntrance);

    return promiseTarget(deferred);
  }
};
