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
  enable: function(flashbands, name) {
    return Flashband.create(flashbands).then(function(flashbands) {
      return FlashbandBatch.create({name: name}).then(function(flashbandBatch) {
        return FlashbandBatch.findOne(flashbandBatch.id).then(function(flashbandBatch) {
          flashbands.forEach(function(flashband) {
            flashbandBatch.flashbands.add(flashband.id);
            //flashband.batch = flashbandBatch;
            //flashband.save();
          });
          return flashbandBatch.save().then(function() {
            return FlashbandBatch.findOne(flashbandBatch.id).exec(function(err, flashbandBatch) {
              var defer = q.defer();
              defer.resolve(flashbandBatch);
              return defer.promise;
            });
          }, function() {console.log('não salvou!!!');});
        });
      });
    });
  }
};
