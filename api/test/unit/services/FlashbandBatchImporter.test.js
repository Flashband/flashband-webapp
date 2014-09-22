/*globals describe,it,FlashbandBatchImporter*/
'use strict';
var expect = require('chai').expect;
describe('FlashbandBatchImporter', function () {

  //readable stream
  var Readable = require('stream').Readable;
  var util = require('util');
  function CSVReader(opt) {
    Readable.call(this, opt);
    this._max = 1;
    this._index = 1;
  }
  util.inherits(CSVReader, Readable);
  CSVReader.prototype._read = function() {
    var i = this._index++;
    if (i > this._max)
      this.push(null);
    else {
      var str = 'Qrcode      ;UID \n000001;80 28 53 3A 0A 83 04 88';
      var buf = new Buffer(str, 'utf8');
      this.push(buf);
    }
  };
  //END: readable stream

  describe('#parse', function() {
    it('should import one valid flashband', function(done) {
      FlashbandBatchImporter.parse(new CSVReader()).then(function(flashbands) {
        expect(flashbands).to.be.ok;
        expect(flashbands.length).to.equal(1);
        expect(flashbands[0].tag).to.equal('8028533A0A830488');
        expect(flashbands[0].serial).to.equal('000001');
        done();
      }).fail(done);
    });
  });
});
