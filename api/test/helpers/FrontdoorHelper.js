var FlashbandHelper = require('./FlashbandHelper');

module.exports = {
  createEntrance: function() {
    return FlashbandHelper.createSuccess().then(function(flashSuccess) {
      return Entrance.create({tag: flashSuccess.tag});
    });
  },

  createEntranceAndBlocked: function() {
    return this.createEntrance().then(function(entrance) {
      return Flashband.findOne({tag: entrance.tag}).then(function(flashband) {
        flashband.blockedAt = new Date();
        return flashband.save(function(err, mdl) {
          return mdl;
        });
      });
    });
  },

  createLeave: function() {
    var leave = function(entrance) {
      entrance.leave = new Date();
      return entrance.save(function(err, mdl) {
        return mdl;
      });
    };

    return this.createEntrance().then(leave);
  }
};
