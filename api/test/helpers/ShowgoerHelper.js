'use strict';

var q = require('q');

module.exports = {
  create: function(params) {
    var defer = q.defer();
    var defaultShowgoer = { name: 'Fulano de Tal', docType: 'cpf', docNumber: '111.111.111-11' };
    Showgoer.create(params || defaultShowgoer).exec(function(err, showgoer) {
      if (err) { return defer.reject(err); }
      defer.resolve(showgoer);
    });
    return defer.promise;
  }
};
