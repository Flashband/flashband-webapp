var q = require('q');

module.exports = {
  create: function showGoerCreate(showGoerParams) {
    var defer = q.defer();

    var saveShowGoer = function() {
      var showgoer = {
        name: showGoerParams.name,
        docType: showGoerParams.docType,
        docNumber: showGoerParams.docNumber
      };

      Showgoer.create(showgoer).exec(function(err, model) {
        defer.resolve(model);
      });
    };

    this.isValidForSave(showGoerParams).then(saveShowGoer).fail(defer.reject);

    return defer.promise;
  },

  summary: function showGoerSummary () {
    var defer = q.defer();

    Showgoer.count().exec(function(err, count) {
      if (err) return defer.reject(err);
      defer.resolve({total: count});
    });

    return defer.promise;
  },

  isValidForSave: function showGoerIsValidForSave(showGoerParams) {
    var defer = q.defer();

    try {
      if (!showGoerParams.name)      throw 'Name is required.';
      if (!showGoerParams.docType)   throw 'Document type is required.';
      if (!showGoerParams.docNumber) throw 'Document number is required.';

      var validTypes = ['cpf', 'rg', 'cnh', 'passport'];
      var typeIsInvalid = validTypes.indexOf(showGoerParams.docType) < 0;
      if (typeIsInvalid) throw 'Invalid document type.';

      Showgoer.findOne({docType: showGoerParams.docType, docNumber: showGoerParams.docNumber}).exec(function (err, saved) {
        if (saved) return defer.reject(new Error('Duplicated document.'));
        defer.resolve(true);
      });

    } catch (err) {
      defer.reject(new Error(err));
    }

    return defer.promise;
  },

  search: function showGoerSearch (args) {
    var defer = q.defer();

    Showgoer.find(args).exec(function(err, listShowGoers) {
      if (err) return defer.reject(err);

      FlashbandService.findAssociations(listShowGoers).then(defer.resolve).fail(defer.reject);
    });

    return defer.promise;
  },

  associate: function showGoerAssociate(showGoerId, flashBandTag) {
    var defer = q.defer();

    Flashband.findOne({tag: flashBandTag}).exec(function(err, flashband) {
      flashband.user = showGoerId;
      flashband.save().then(defer.resolve, defer.reject);
    });

    return defer.promise;
  }
};
