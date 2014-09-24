/*globals describe,it,FlashbandBatchImporter*/
'use strict';
var expect = require('chai').expect;
var stringReadableStream = require('../../helpers/StringReadableStream');

describe('FlashbandBatchImporter', function () {

  describe('#parse', function() {
    it('should import one valid flashband', function(done) {
      var fileContent = 'Qrcode      ;UID \n000001;80 28 53 3A 0A 83 04 88';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      FlashbandBatchImporter.parse(importFile).then(function(flashbands) {
        expect(flashbands).to.be.ok;
        expect(flashbands.length).to.equal(1);
        expect(flashbands[0].tag).to.equal('8028533A0A830488');
        expect(flashbands[0].serial).to.equal('000001');
        done();
      }).fail(done);
    });
    it('should ignore empty flashbands', function(done) {
      var fileContent = 'Qrcode      ;UID \n;\n000001;80 28 53 3A 0A 83 04 88';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      FlashbandBatchImporter.parse(importFile).then(function(flashbands) {
        expect(flashbands).to.be.ok;
        expect(flashbands.length).to.equal(1);
        expect(flashbands[0].tag).to.equal('8028533A0A830488');
        expect(flashbands[0].serial).to.equal('000001');
        done();
      }).fail(done);
    });
  });
});
//
