'use strict';

var sgHelp = require('./ShowgoerHelper');

var q = require('q');
var prepareArgs = function(tag, serial, blockedAt) {
  var newTag = tag ? tag : ''.concat((new Date()).getTime());
  var newSerial = serial ? serial : 1;
  return {tag: newTag, serial: newSerial, blockedAt: blockedAt};
};

module.exports = {

  findOne: function(flashbandTag) {
    return Flashband.findOne({tag: flashbandTag});
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
  },

  createAssociated: function() {
    return this.createSuccess().then(function(flashband) {
      return sgHelp.create().then(function(showgoer) {
        return ShowgoerService.associate(showgoer.id, flashband.tag);
      });
    });
  }
};
