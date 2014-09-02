module.exports = {
  exists: function(flashbandUid) {
    return Flashband.count({ tag: flashbandUid }).then(function (count) {
      return !!count && count > 0;
    });
  },
  block: function(flashbandUid) {
    return Flashband.findOne({ tag: flashbandUid }).then(function(flashband) {
      flashband.blockedAt = new Date();
      return flashband.save();
    });
  }
};
