var q = require('q');
//var tokenHasher = require('password-hash');

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

    var showgoer = {};
    showgoer.name = showgoerParams.name;
    showgoer[showgoerParams.doctype] = showgoerParams.docnumber;

    Showgoer.create(showgoer).exec(function(err, model) {
      defer.resolve(model);
    });
    return defer.promise;
  }
};
