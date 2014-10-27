'use strict';

var q = require('q');

module.exports = {
  create: function(showGoerParams) {
    var saveShowGoer = function() {
      var showgoer = {
        name: showGoerParams.name,
        docType: showGoerParams.docType,
        docNumber: showGoerParams.docNumber
      };

      return Showgoer.create(showgoer);
    };

    return this.isValidForSave(showGoerParams).then(saveShowGoer);
  },

  summary: function() {
    return Showgoer.count().then(function(count) {
      return {total: count};
    });
  },

  isValidForSave: function(showGoerParams) {
    var defer = q.defer();

    try {
      if (!showGoerParams.name)      { throw new Error('Name is required.');            }
      if (!showGoerParams.docType)   { throw new Error('Document type is required.');   }
      if (!showGoerParams.docNumber) { throw new Error('Document number is required.'); }

      var validTypes = ['cpf', 'rg', 'cnh', 'passport'];
      var typeIsInvalid = validTypes.indexOf(showGoerParams.docType) < 0;
      if (typeIsInvalid) { throw new Error('Invalid document type.'); }

      Showgoer.findOne({docType: showGoerParams.docType, docNumber: showGoerParams.docNumber}).exec(function (err, saved) {
        if (saved) { return defer.reject(new Error('Duplicated document.')); }
        defer.resolve(true);
      });

    } catch (err) {
      defer.reject(err);
    }

    return defer.promise;
  },

  search: function(args) {
    var defer = q.defer();

    Showgoer.find(args).then(function(listShowGoers) {
      FlashbandService.findAssociations(listShowGoers).then(function(showgoers) {
        var setStatus = function(item, next) {
          item.status = 'not';
          item.zone   = '';

          if (item.flashband) {
            item.status = 'out';

            Entrance.findOne({tag: item.flashband, leave: null}).exec(function(err, entrance) {
              if (err) return next();

              if (entrance) {
                item.zone = entrance.zone;
                item.status = 'in';
                next();
              } else {
                item.status = 'out';

                Entrance.findOne({tag: item.flashband}).exec(function(err, leave) {
                  if (err) return next();
                  if (leave) item.zone = leave.zone;
                  next();
                });
              }
            });
          } else {
            next();
          }
        };

        async.eachSeries(showgoers, setStatus, function(err) {
          if (err) return defer.reject(err);
          defer.resolve(showgoers);
        });
      });
    });

    return defer.promise;
  },

  associate: function(showGoerId, flashBandTag) {
    return FlashbandService.exists(flashBandTag).then(function(flashband) {
      if (flashband.blocked()) { throw new Error('Blocked Flashband'); }
      if (flashband.showgoer) { throw new Error('Flashband ever associated'); }

      return FlashbandService.findByShowgoer(showGoerId).then(function(flashbandAssocieted) {
        if (flashbandAssocieted) { throw new Error('Showgoer ever associated'); }

        return Showgoer.findOne(showGoerId).then(function(showgoer) {
          flashband.showgoer = showgoer;
          return flashband.save();
        });
      });
    });
  },

  findOne: function(showGoerId) {
    return Showgoer.findOne(showGoerId);
  }
};
