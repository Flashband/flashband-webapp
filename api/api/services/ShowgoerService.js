var q = require('q');

module.exports = {
  create: function(showgoerParams) {
    var defer = q.defer();

    if (! showgoerParams.name) {
      defer.reject(new Error('Name is required.'));
      return defer.promise;
    }
    if (! showgoerParams.doctype) {
      defer.reject(new Error('Document type is required.'));
      return defer.promise;
    }
    if (! showgoerParams.docnumber) {
      defer.reject(new Error('Document number is required.'));
      return defer.promise;
    }
    if (['cpf', 'rg', 'cnh', 'passport'].indexOf(showgoerParams.doctype) < 0) {
      defer.reject(new Error('Invalid document type.'));
      return defer.promise;
    }

    var showgoer = {};
    showgoer[showgoerParams.doctype] = showgoerParams.docnumber;


    Showgoer.findOne(showgoer).exec(function(err, saved) {
      if (saved) {
        return defer.reject(new Error('Duplicated document.'));
      }

      showgoer.name = showgoerParams.name;

      Showgoer.create(showgoer).exec(function(err, model) {
        defer.resolve(model);
      });
    });
    return defer.promise;
  }
};
