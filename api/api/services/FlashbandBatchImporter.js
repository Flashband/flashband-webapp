'use strict';

var csv = require('csv');
var q = require('q');

var validate = function(flashbands) {
  var result = {
    ok: true,
    error: false
  };
  if (flashbands.length === 0) {
    result.ok = false;
    result.error = 'No flashbands found.';
    return result;
  }

  var tags = [];
  var serials = [];

  for (var i = 0; i < flashbands.length; i++) {
    var flashband = flashbands[i];
    if (!flashband.tag) {
      result.ok = false;
      result.error = 'Missing UID.';
      return result;
    }
    if (!flashband.serial) {
      result.ok = false;
      result.error = 'Missing Qrcode.';
      return result;
    }
    if (tags.indexOf(flashband.tag) > -1) {
      result.ok = false;
      result.error = 'Duplicated UID.';
      return result;
    }
    tags.push(flashband.tag);
    if (serials.indexOf(flashband.serial) > -1) {
      result.ok = false;
      result.error = 'Duplicated Qrcode.';
      return result;
    }
    serials.push(flashband.serial);
  }
  return result;
};

module.exports = {
  parse: function(input) {
    var defer = q.defer();

    var parser = csv.parse({columns: true, trim: true, delimiter: ';'});
    var flashbands = [];
    var transformer = csv.transform(function(record) {
      if (!(record.UID || record.Qrcode)) { return; }

      var tag = record.UID.replace(/ /g, '');
      var serial = record.Qrcode;
      flashbands.push({tag: tag, serial: serial});
    });

    transformer.on('finish', function() {
      var validation = validate(flashbands);
      if (validation.ok) { return defer.resolve(flashbands); }

      defer.reject(new Error(validation.error));
    });

    transformer.on('error', function(err) {
      defer.reject(err);
    });

    input.pipe(parser).pipe(transformer);

    return defer.promise;
  }
};
