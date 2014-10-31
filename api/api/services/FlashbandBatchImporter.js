'use strict';
var csv = require('csv');
var q = require('q');

var convertFlashband = function(record) {
  for (var k in record)
    record[k.toLowerCase()] = record[k];

  if (!(record.uid || record.qrcode))
    return {tag: false, serial: false, error: true};

  var objReturn = {
    tag: record.uid.replace(/\s/g, '').toUpperCase().trim(),
    serial: record.qrcode,
    error: false
  };

  if (record.referencia)
    objReturn.ref = record.referencia;

  return objReturn;
};

module.exports = {
  parse: function(input) {
    var defer = q.defer();

    var parser = csv.parse({columns: true, trim: true, delimiter: ';'});
    var flashbands = [];
    var transformer = csv.transform(function(record) {
      flashbands.push(convertFlashband(record));
    });

    transformer.on('finish', function() {
      var errors = new FlashbandBatchValidator(flashbands).validate(flashbands);

      if (errors.length) {
        defer.reject(errors);
      } else {
        var newList = [];

        flashbands.forEach(function(f) {
          if (!f.error) {
            var item = { tag: f.tag, serial: f.serial};
            if (f.ref) item.ref = f.ref;
            newList.push(item);
          }
        });

        if (!newList.length)
          return defer.reject([{line: 1, error: 'No flashbands found.'}]);

        defer.resolve(newList);
      }
    });

    transformer.on('error', function(err) {
      defer.reject(err);
    });

    input.pipe(parser).pipe(transformer);

    return defer.promise;
  }
};
