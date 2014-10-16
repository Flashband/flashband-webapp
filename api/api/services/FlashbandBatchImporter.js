'use strict';

var csv = require('csv');
var q = require('q');

var validate = function(flashbands) {
  var errors = [];

  if (!flashbands.length) {
    errors.push({line: 1, error: 'No flashbands found.'});
    return errors;
  }

  var tags = [];
  var serials = [];

  for (var i = 0; i < flashbands.length; i++) {
    var flashband = flashbands[i];
    if (!flashband.tag) { errors.push({line: i+2, error: 'Missing UID.'}); }
    if (!flashband.serial) { errors.push({line: i+2, error: 'Missing Qrcode.'}); }

    if (flashband.tag) {
      if (tags.indexOf(flashband.tag) > -1) {
        errors.push({line: i+2, error: 'Duplicated UID.'});
      }

      tags.push(flashband.tag);
    }

    if (flashband.tag) {
      if (serials.indexOf(flashband.serial) > -1) {
        errors.push({line: i+2, error: 'Duplicated Qrcode.'});
      }

      serials.push(flashband.serial);
    }
  }

  return errors;
};

module.exports = {
  parse: function(input) {
    var defer = q.defer();

    var parser = csv.parse({columns: true, trim: true, delimiter: ';'});
    var flashbands = [];
    var transformer = csv.transform(function(record) {
      if (!(record.UID || record.Qrcode)) { return; }

      var tag = record.UID.replace(/\s/g, '').toUpperCase();
      var serial = record.Qrcode;
      flashbands.push({tag: tag, serial: serial});
    });

    transformer.on('finish', function() {
      var errors = validate(flashbands);

      if (errors.length) {
        defer.reject(errors);
      } else {
        defer.resolve(flashbands);
      }
    });

    transformer.on('error', function(err) {
      defer.reject(err);
    });

    input.pipe(parser).pipe(transformer);

    return defer.promise;
  }
};
