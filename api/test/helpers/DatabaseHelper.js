var async = require('async');
var q = require('q');

module.exports = {
  emptyModels: function(models, callback) {
    var defer = q.defer();
    async.each(models, function(model, next) {
      model.drop();
      next();
    }, function(err, results) {
      if (callback) callback(err, results);
      if (err) defer.reject(err); else defer.resolve(results);
    });
    return defer.promise;
  }
};
