describe('FlashbandBatchImporter', function () {


//readable stream
var Readable = require('stream').Readable;
var util = require('util');
function CSVReader(opt) {
  Readable.call(this, opt);
  this._max = 1;
  this._index = 0;
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



  //var fileContent = 'Qrcode      ;UID \n000001;80 28 53 3A 0A 83 04 88';
  var throwError = function(error) {
    throw error;
  };
  it('##### WORKS!', function () {
    FlashbandBatchImporter.parse(new CSVReader()).then(function(flashbands) {
      console.log('##### flashbands:', flashbands);
      expect(flashbands).toBeTruthy();
      expect(flashbands.length).toEqual(1);
      expect(flashbands[0].tag).toEqual('8028533A0A830488');
      expect(flashbands[0].serial).toEqual('000001');
    }).fail(throwError);
    rs.write(fileContent);
  });
});
