'use strict';

var fbHelp = require('./FlashbandHelper');

var throwErr = function(err) {
  throw err;
};

module.exports = {
  createEntrance: function() {
    return fbHelp.createAssociated().then(function(flashband) {
      return Entrance.create({tag: flashband.tag, zone: '1'});
    }).fail(throwErr);
  },

  createEntranceAndBlocked: function() {
    return this.createEntrance().then(function(entrance) {
      return Flashband.findOne({tag: entrance.tag}).then(function(flashband) {
        flashband.blockedAt = new Date();
        return flashband.save();
      }).fail(throwErr);
    }).fail(throwErr);
  },

  createLeave: function() {
    var leave = function(entrance) {
      entrance.leave = new Date();
      return entrance.save();
    };

    return this.createEntrance().then(leave);
  }
};
