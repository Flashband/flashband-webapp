'use strict';

var Readable = require('stream').Readable;
var util = require('util');

var StringReadableStream = function(content, opt) {
  Readable.call(this, opt);
  this._max = 1;
  this._index = 1;
  this.content = content;
};

util.inherits(StringReadableStream, Readable);

StringReadableStream.prototype._read = function() {
  var i = this._index++;
  if (i > this._max) {
    this.push(null);
  } else {
    var buf = new Buffer(this.content, 'utf8');
    this.push(buf);
  }
};

module.exports = {
  createReadableStream: function(content, opts) {
    return new StringReadableStream(content, opts);
  }
};
