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

    if (flashband.error) {
      continue;
    }

    if (!flashband.serial) { errors.push({line: i+2, error: 'Missing Qrcode.'}); }

    if (flashband.tag.trim()) {
      var defaultPairs = flashband.tag.replace(/\s/g, '').toUpperCase().length === 14;

      if (defaultPairs) {
        if (tags.indexOf(flashband.tag) > -1) {
          errors.push({line: i+2, error: 'Duplicated UID.'});
        }

        tags.push(flashband.tag);
      } else {
        errors.push({line: i+2, error: 'Number of tag\'s pairs nonstandard.'});
      }
    } else {
      errors.push({line: i+2, error: 'Missing UID.'});
    }

    if (flashband.tag) {
      if (serials.indexOf(flashband.serial) > -1) {
        errors.push({line: i+2, error: 'Duplicated Qrcode.'});
      }

      if (flashband.serial) serials.push(flashband.serial);
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
      if (!(record.UID || record.Qrcode)) {
        flashbands.push({tag: false, serial: false, error: true});
        return;
      }

      var tag = record.UID.replace(/\s/g, '').toUpperCase();
      var serial = record.Qrcode;
      flashbands.push({tag: tag, serial: serial, error: false});
    });

    transformer.on('finish', function() {
      var errors = validate(flashbands);

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
