'use strict';
var csv = require('csv');
var q = require('q');


var convertFlashband = function(record) {
  if (!(record.UID || record.Qrcode)) {
    return {tag: false, serial: false, error: true};
  } else {
    var tag = record.UID.replace(/\s/g, '').toUpperCase().trim();
    var serial = record.Qrcode;
    return {tag: tag, serial: serial, error: false};
  }
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
            newList.push({ tag: f.tag, serial: f.serial});
          }
        });

        if (!newList.length) {
          return defer.reject([{line: 1, error: 'No flashbands found.'}]);
        }

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
