var q = require('q');

module.exports = {
  create: function() {
    var defer = q.defer();
    Showgoer.create({name: 'Fulano de Tal', cpf: '111.111.111-11'}).exec(function(err, showgoer) {
      if (err) return defer.reject(err);
      defer.resolve(showgoer);
    });
    return defer.promise;
  }
};
