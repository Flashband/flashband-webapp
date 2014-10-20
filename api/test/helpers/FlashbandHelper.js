'use strict';

var q = require('q');
var prepareArgs = function(tag, serial, blockedAt) {
  var newTag = tag ? tag : ''.concat((new Date()).getTime());
  var newSerial = serial ? serial : 1;
  return {tag: newTag, serial: newSerial, blockedAt: blockedAt};
};

module.exports = {

  findOne: function(flashbandTag) {
    return Flashband.findOne(flashbandTag);
  },

  createBlocked: function(tag, serial) {
    var defer = q.defer();
    var args = prepareArgs(tag, serial, new Date());
    Flashband.create(args).then(function(flashband) {
      defer.resolve(flashband);
    });
    return defer.promise;
  },

  createSuccess: function(tag, serial) {
    var defer = q.defer();
    var args = prepareArgs(tag, serial, null);
    Flashband.create(args).then(function(flashband) {
      defer.resolve(flashband);
    });
    return defer.promise;
  }
};
