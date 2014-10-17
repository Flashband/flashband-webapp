'use strict';

var aSync = require('async');
var q = require('q');

module.exports = {
  emptyModels: function(models, callback) {
    var defer = q.defer();

    aSync.each(models, function(model, next) {
      model.count().exec(function(err, count) {
        if (err) { return next(err); }
        if (count) { return model.destroy().exec(next); }
        next();
      });
    }, function(err, results) {
      if (callback) { callback(err, results); }
      if (err) { return defer.reject(err); }
      defer.resolve(results);
    });

    return defer.promise;
  }
};
