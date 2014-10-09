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

      return Showgoer.create(showgoer).then(function(model) {
        return model;
      });
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
    return Showgoer.find(args).then(function(listShowGoers) {
      return FlashbandService.findAssociations(listShowGoers);
    });
  },

  associate: function(showGoerId, flashBandTag) {
    return FlashbandService.exists(flashBandTag).then(function(flashband) {
      if (flashband.blocked()) { throw new Error('Blocked Flashband'); }

      flashband.user = showGoerId;
      return flashband.save();
    });
  }
};
