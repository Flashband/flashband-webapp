'use strict';

var q = require('q');

var inactivate = function(flashbandBatches) {
  flashbandBatches.forEach(function(flashbandBatch) {
    flashbandBatch.inactivate();
    flashbandBatch.save();
  });
};

module.exports = {
  findOne: function(flashbandUid) {
    return Flashband.findOne({ tag: flashbandUid.replace(/\s/g, '').toUpperCase(), imported: true }).populate('showgoer');
  },

  findByShowgoer: function(showgoerId) {
    return Flashband.findOne({ showgoer: showgoerId, blockedAt: null, imported: true  });
  },

  exists: function(flashbandUid) {
    return this.findOne(flashbandUid).then(function(flashband) {
      if (!flashband) { throw new Error('Flashband not found.'); }
      return flashband;
    });
  },

  block: function(flashbandUid) {
    return this.exists(flashbandUid).then(function(flashband) {
      if (flashband.blocked()) { throw new Error('Flashband already blocked.'); }

      flashband.blockedAt = new Date();
      return flashband.save();
    });
  },

  findAssociations: function(listShowGoers) {
    var defer = q.defer();

    var findAssociation = function(showGoer, next) {
      FlashbandService.findByShowgoer(showGoer.id).exec(function(err, flashband) {
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

  deleteAllFlashbands: function() {
    return Flashband.update({imported: true}, {imported: false});
  },

  enable: function(flashbands, name, file) {
    var defer = q.defer();

    this.deleteAllFlashbands().then(function afterLogicallyDeleteRecords() {
      var batchFlashbands = [];

      var createFlashband = function(arg, next) {
        var appendFlashband = function(flashband) {
          batchFlashbands.push(flashband);
          next();
        };

        var rejectBatch = function(reason) {
          defer.reject(reason);
          next();
        };

        Flashband.findOne({ tag: arg.tag }).exec(function(err, flashband) {
          if (err) { return rejectBatch(err); }
          if (!flashband) {
            flashband = {
              tag: arg.tag
            };
          }
          flashband.imported = true;
          flashband.serial = arg.serial;
          flashband.blockedAt = null;
          flashband.showgoer = null;
          if (flashband.id) {
            flashband.save().then(appendFlashband).fail(rejectBatch);
          } else {
            Flashband.create(flashband).then(appendFlashband).fail(rejectBatch);
          }
        });
      };

      async.each(flashbands, createFlashband, function(err) {
        if (err) return defer.reject(err instanceof Error ? err : new Error(err));

        FlashbandBatch.find({active: true}).exec(function(err, flashbandBatches) {
          if (err) return defer.reject(err);

          inactivate(flashbandBatches);

          FlashbandBatch.create({name: name, file: file, active: true}).exec(function(err, flashbandBatch) {
            if (err) return defer.reject(err);

            batchFlashbands.forEach(function(flashband) {
              flashbandBatch.flashbands.add(flashband.id);
            });

            flashbandBatch.save().then(function(savedFlashbandBatch) {
              defer.resolve(savedFlashbandBatch);
            }).fail(defer.reject);
          });
        });
      });
    }, defer.reject);

    return defer.promise;
  }
};
