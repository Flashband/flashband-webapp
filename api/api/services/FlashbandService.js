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
    return Flashband.findOne({ tag: flashbandUid, imported: true });
  },

  findByShowgoer: function(showgoerId) {
    return Flashband.findOne({ user: showgoerId, blockedAt: null, imported: true  });
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
    return Flashband.update({imported: true}, {imported: false}).then(function(updateds) {
      return updateds;
    });
  },

  enable: function(flashbands, name, file) {
    var defer = q.defer();

    this.deleteAllFlashbands().then(function afterLogicallyDeleteRecords() {
      var newFlashbands = [];

      var createFlashband = function(arg, next) {
        var create = {
          tag: arg.tag,
          imported: true,
          blockedAt: null
        };

        Flashband.findOrCreate(arg, create, function(err, flashband) {
          if (err) { return defer.reject(err); }
          newFlashbands.push(flashband);
          next();
        });
      };

      async.each(flashbands, createFlashband, function(err) {
        if (err) {
          defer.reject(err instanceof Error ? err : new Error(err));
          return;
        }

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
      });
    }, defer.reject);

    return defer.promise;
  }
};
