var q = require('q');
//var tokenHasher = require('password-hash');

module.exports = {
  create: function(showgoerParams) {
    var defer = q.defer();
    var showgoer = {};
    showgoer.name = showgoerParams.name;
    showgoer[showgoerParams.doctype] = showgoerParams.docnumber;
    Showgoer.create(showgoer).exec(function(err, model) {
      defer.resolve(model);
    });
    return defer.promise;
  }
};
