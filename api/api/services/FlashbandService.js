var q = require('q');

module.exports = {
  exists: function(flashbandUid) {
    return Flashband.count({ tag: flashbandUid }).then(function (count) {
      return !!count && count > 0;
    });
  },

  block: function(flashbandUid) {
    return Flashband.findOne({ tag: flashbandUid }).then(function(flashband) {
      if (!flashband) throw 'Flashband not found.';
      if (flashband.blockedAt) throw 'Flashband already blocked.';
      flashband.blockedAt = new Date();
      return flashband.save();
    });
  },
  enable: function(flashbands, name, file) {
    return Flashband.create(flashbands).then(function(flashbands) {
      return FlashbandBatch.create({name: name, file: file, active: true}).then(function(flashbandBatch) {
        flashbands.forEach(function(flashband) {
          flashbandBatch.flashbands.add(flashband.id);
        });
        return flashbandBatch.save();
      });
    });
  }
};
