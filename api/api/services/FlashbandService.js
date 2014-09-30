var q = require('q');

var inactivate = function(flashbandBatches) {
  flashbandBatches.forEach(function(flashbandBatch) {
    flashbandBatch.inactivate();
    flashbandBatch.save();
  });
};

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
    var defer = q.defer();
    Flashband.destroy().exec(function(err) {
      if (err) {
        defer.reject(err);
        return;
      }
      var newFlashbands = [];
      var createFlashband = function(args, next) {
        Flashband.create(args).exec(function (err, flashband) { 
          if (err) {
            next(err);
            return;
          }
          newFlashbands.push(flashband); 
          next();
        });
      };
      async.each(flashbands, createFlashband, function(err) {
        if (err) {
          defer.reject(err instanceof Error ? err : new Error(err));
        } else {
          FlashbandBatch.find({active: true}).exec(function(err, flashbandBatches) {
            if (err) {
              defer.reject(err);
              return;
            }
            inactivate(flashbandBatches);
            FlashbandBatch.create({name: name, file: file, active: true}).exec(function(err, flashbandBatch) {
              if (err) {
                defer.reject(err);
                return;
              }
              newFlashbands.forEach(function(flashband) {
                flashbandBatch.flashbands.add(flashband.id);
              });
              flashbandBatch.save().then(defer.resolve, defer.reject);
            });
          });
        }
      });
    });
    return defer.promise;
  }
};
