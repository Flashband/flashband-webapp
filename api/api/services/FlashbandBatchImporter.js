var csv = require('csv');
var q = require('q');

module.exports = {
  parse: function(input) {
    var defer = q.defer();
    var parser = csv.parse({columns: true, trim: true, delimiter: ';'});
    var flashbands = [];
    var transformer = csv.transform(function(record) {
      var tag = record.UID.replace(/ /g, '');
      var serial = record.Qrcode;
      if (!(tag || serial))
        return;
      flashbands.push({tag: tag, serial: serial});
    });
    transformer.on('finish', function() {
      defer.resolve(flashbands);
    });
    transformer.on('error', function(err) {
      defer.reject(err);
    });
    input.pipe(parser).pipe(transformer);
    return defer.promise;
  }
};
