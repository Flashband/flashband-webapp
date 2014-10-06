var q = require('q');

module.exports = {
  create: function(showgoerParams) {
    var defer = q.defer();

    if (! showgoerParams.name) {
      defer.reject(new Error('Name is required.'));
      return defer.promise;
    }

    if (! showgoerParams.docType) {
      defer.reject(new Error('Document type is required.'));
      return defer.promise;
    }

    if (! showgoerParams.docNumber) {
      defer.reject(new Error('Document number is required.'));
      return defer.promise;
    }

    if (['cpf', 'rg', 'cnh', 'passport'].indexOf(showgoerParams.docType) < 0) {
      defer.reject(new Error('Invalid document type.'));
      return defer.promise;
    }

    Showgoer.findOne({docType: showgoerParams.docType, docNumber: showgoerParams.docNumber}).exec(function(err, saved) {
      if (saved) {
        return defer.reject(new Error('Duplicated document.'));
      }

      var showgoer = {
        name: showgoerParams.name,
        docType: showgoerParams.docType,
        docNumber: showgoerParams.docNumber
      };

      Showgoer.create(showgoer).exec(function(err, model) {
        defer.resolve(model);
      });
    });
    return defer.promise;
  }
};
