'use strict';

var validate = function(flashbandUid) {
  return FlashbandService.exists(flashbandUid).then(function(flashband) {
    if (flashband.blocked()) { throw new Error('Blocked flashband.'); }
    return flashband;
  });
};

module.exports = {
  registerEnter: function(flashbandUid) {
    return validate(flashbandUid).then(function(flashband) {
      return FrontdoorService.checkRegistered(flashband.tag).then(function(registered) {
        if (registered) { throw new Error('Duplicated entrance.'); }

        return Entrance.create({ tag: flashbandUid }).then(function(entranceModel) {
          return entranceModel;
        });
      });
    });
  },

  registerLeave: function(flashbandUid) {
    return validate(flashbandUid).then(function(flashband) {
      return FrontdoorService.checkAlreadyOut(flashband.tag).then(function(alreadyOut) {
        if (alreadyOut) { throw new Error('Duplicated exit.'); }
        return Entrance.findOne({ tag: flashbandUid, leave: null }).then(function(entranceModel) {
          entranceModel.leave = new Date();

          return entranceModel.save().then(function(mdl) {
            return mdl;
          });
        });
      });
    });
  },

  checkRegistered: function(flashbandUid) {
    return Entrance.findOne({ tag: flashbandUid, leave: null }).then(function(found) {
      return Boolean(found);
    });
  },

  checkAlreadyOut: function(flashbandUid) {
    return Entrance.findOne({ tag: flashbandUid, leave: null }).then(function(found) {
      return !Boolean(found);
    });
  }
};
