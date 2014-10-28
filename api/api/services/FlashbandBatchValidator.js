'use strict';
var TAG_LENGTH = 14;

var FlashbandBatchValidator = function(flashbands) {
  this.flashbands = flashbands;
  this.errors = [];
  this.tags = [];
  this.serials = [];
};

FlashbandBatchValidator.prototype.validate = function() {
  if (!this.flashbands.length) {
    this.errors.push({line: 1, error: 'No flashbands found.'});
    return this.errors;
  }

  for (var i = 0; i < this.flashbands.length; i++) {
    var flashband = this.flashbands[i];

    if (flashband.error) continue;

    this._validateFlashband(i+2, flashband);
  }
  return this.errors;
};

FlashbandBatchValidator.prototype._tagAlreadyProcessed = function(tag) {
  return this.tags.indexOf(tag) > -1;
};

FlashbandBatchValidator.prototype._serialAlreadyProcessed = function(serial) {
  return this.serials.indexOf(serial) > -1;
};

FlashbandBatchValidator.prototype._checkUidDuplication = function(line, flashband) {
  if (this._tagAlreadyProcessed(flashband.tag)) this.errors.push({line: line, error: 'Duplicated UID.'});
  this.tags.push(flashband.tag);
};

FlashbandBatchValidator.prototype._checkSerialDuplication = function(line, flashband) {
  if (this._serialAlreadyProcessed(flashband.serial)) this.errors.push({line: line, error: 'Duplicated Qrcode.'});
  if (flashband.serial) this.serials.push(flashband.serial);
};

FlashbandBatchValidator.prototype._validateFlashband = function(line, flashband) {
  if (!flashband.serial) { this.errors.push({line: line, error: 'Missing Qrcode.'}); }

  if (flashband.tag) {
    if (flashband.tag.length === TAG_LENGTH) {
      this._checkUidDuplication(line, flashband);
    } else {
      this.errors.push({line: line, error: 'Number of tag\'s pairs nonstandard.'});
    }
    this._checkSerialDuplication(line, flashband);
  } else {
    this.errors.push({line: line, error: 'Missing UID.'});
  }
};

module.exports = FlashbandBatchValidator;
