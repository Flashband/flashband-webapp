'use strict';

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
    var defer = q.defer();

    Flashband.findOne({ tag: flashbandUid }).exec(function(err, flashband) {
      if (err) { return defer.reject(err); }
      if (!flashband) { return defer.reject(new Error('Flashband not found.')); }
      if (flashband.blockedAt) { return defer.reject(new Error('Flashband already blocked.')); }

      flashband.blockedAt = new Date();
      flashband.save(function(err, flashband) {
        if (err) { return defer.reject(err); }
        defer.resolve(flashband);
      });
    });

    return defer.promise;
  },

  findAssociations: function flashbandFindAssociations(listShowGoers) {
    var defer = q.defer();

    var findAssociation = function(showGoer, next) {
      Flashband.findOne({ user: showGoer.id, blockedAt: null }).exec(function(err, flashband) {
        showGoer.flashband = '';
        if (flashband) { showGoer.flashband = flashband.tag; }
        next();
      });
    };

    async.each(listShowGoers, findAssociation, function(err) {
      if (err) { return defer.reject(err); }
      defer.resolve(listShowGoers);
    });

    return defer.promise;
  },

  enable: function(flashbands, name, file) {
    var defer = q.defer();

    Flashband.destroy().exec(function(err) {
      if (err) { return defer.reject(err); }

      var newFlashbands = [];

      var createFlashband = function(args, next) {
        Flashband.create(args, function(err, flashband) {
          if (err) { return defer.reject(err); }
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
