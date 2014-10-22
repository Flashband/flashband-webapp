'use strict';

var validate = function(args) {
  return FlashbandService.exists(args.tag).then(function(flashband) {
    if (flashband.blocked()) throw new Error('Blocked flashband.');
    return flashband;
  }).then(function(flashband) {
    if (!args.zone) throw new Error('Zone not filled.');
    return flashband;
  }).then(function(flashband) {
    if (!flashband.showgoer) throw new Error('Flashband not associated.');
    return flashband;
  });
};

module.exports = {
  registerEnter: function(args) {
    return validate(args).then(function() {
      return FrontdoorService.checkRegistered(args).then(function(registered) {
        if (registered) { throw new Error('Duplicated entrance.'); }

        return Entrance.update({ tag: args.tag, leave: null }, { leave: new Date() }).then(function() {
          return Entrance.create(args);
        });
      });
    });
  },

  registerLeave: function(args) {
    return validate(args).then(function() {
      return FrontdoorService.checkAlreadyOut(args).then(function(alreadyOut) {
        if (alreadyOut) { throw new Error('Duplicated exit.'); }

        return Entrance.findOne({ tag: args.tag, zone: args.zone, leave: null }).then(function(entranceModel) {
          entranceModel.leave = new Date();
          return entranceModel.save();
        });
      });
    });
  },

  checkRegistered: function(args) {
    return Entrance.findOne({ tag: args.tag, zone: args.zone, leave: null }).then(function(found) {
      return Boolean(found);
    });
  },

  checkAlreadyOut: function(args) {
    return this.checkRegistered(args).then(function(found) {
      return !found;
    });
  }
};
