'use strict';

var q = require('q');

module.exports = {
  create: function(params) {
    var defer = q.defer();
    var defaultShowgoer = { name: 'Fulano de Tal', docType: 'cpf', docNumber: new Date() };

    Showgoer.create(params || defaultShowgoer).exec(function(err, showgoer) {
      if (err) { return defer.reject(err); }
      defer.resolve(showgoer);
    });
    return defer.promise;
  }
};
