'use strict';

var validate = function(crossArgs) {
  return FlashbandService.exists(crossArgs.tag).then(function(flashband) {
    if (flashband.blocked()) { throw new Error('Blocked flashband.'); }
    return flashband;
  }).then(function(flashband) {
    if (!crossArgs.zone) { throw new Error('Zone not filled.'); }
    return flashband;
  });
};

module.exports = {
  registerEnter: function(crossArgs) {
    return validate(crossArgs).then(function() {
      return FrontdoorService.checkRegistered(crossArgs).then(function(registered) {
        if (registered) { throw new Error('Duplicated entrance.'); }
        return Entrance.create(crossArgs);
      });
    });
  },

  registerLeave: function(crossArgs) {
    return validate(crossArgs).then(function() {
      return FrontdoorService.checkAlreadyOut(crossArgs).then(function(alreadyOut) {
        if (alreadyOut) { throw new Error('Duplicated exit.'); }

        return Entrance.findOne({ tag: crossArgs.tag, zone: crossArgs.zone, leave: null }).then(function(entranceModel) {
          entranceModel.leave = new Date();
          return entranceModel.save();
        });
      });
    });
  },

  checkRegistered: function(crossArgs) {
    return Entrance.findOne({ tag: crossArgs.tag, zone: crossArgs.zone, leave: null }).then(function(found) {
      return Boolean(found);
    });
  },

  checkAlreadyOut: function(crossArgs) {
    return this.checkRegistered(crossArgs).then(function(found) {
      return !found;
    });
  }
};
