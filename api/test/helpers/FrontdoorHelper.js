'use strict';

var fbHelp = require('./FlashbandHelper');

module.exports = {
  createEntrance: function() {
    return fbHelp.createSuccess().then(function(flashSuccess) {
      return Entrance.create({tag: flashSuccess.tag, zone: '1'});
    });
  },

  createEntranceAndBlocked: function() {
    return this.createEntrance().then(function(entrance) {
      return Flashband.findOne({tag: entrance.tag}).then(function(flashband) {
        flashband.blockedAt = new Date();
        return flashband.save();
      });
    });
  },

  createLeave: function() {
    var leave = function(entrance) {
      entrance.leave = new Date();
      return entrance.save();
    };

    return this.createEntrance().then(leave);
  }
};
