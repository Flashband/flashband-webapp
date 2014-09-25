/*globals describe,it,FlashbandBatchImporter*/
'use strict';
var expect = require('chai').use(require('chai-as-promised')).expect;
var stringReadableStream = require('../../helpers/StringReadableStream');

describe('FlashbandBatchImporter', function () {

  describe('#parse', function() {
    it('should import one valid flashband', function(done) {
      var fileContent = 'Qrcode      ;UID \n000001;80 28 53 3A 0A 83 04 88';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.deep.equal([{tag: '8028533A0A830488', serial: '000001'}]).and.notify(done);
    });
    it('should ignore empty flashbands', function(done) {
      var fileContent = 'Qrcode      ;UID \n;\n000001;80 28 53 3A 0A 83 04 88';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.deep.equal([{tag: '8028533A0A830488', serial: '000001'}]).and.notify(done);
    });
    it('should reject files with duplicated UID', function(done) {
      var fileContent = 'Qrcode      ;UID \n000001;80 28 53 3A 0A 83 04 88\n000002;80 28 53 3A 0A 83 04 88';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.be.rejectedWith('Duplicated UID.').and.notify(done);
    });
    it('should reject files with duplicated Serial', function(done) {
      var fileContent = 'Qrcode      ;UID \n000001;80 28 53 3A 0A 83 04 88\n000001;00 00 00 00 00 00 00 00';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.be.rejectedWith('Duplicated Serial.').and.notify(done);
    });
    it('should reject empty file', function(done) {
      var fileContent = '';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.be.rejectedWith('No flashbands found.').and.notify(done);
    });
    it('should reject file without flashbands', function(done) {
      var fileContent = 'Qrcode      ;UID ';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.be.rejectedWith('No flashbands found.').and.notify(done);
    });
    it('should reject file with only empty flashbands', function(done) {
      var fileContent = 'Qrcode      ;UID \n;\n;\n';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.be.rejectedWith('No flashbands found.').and.notify(done);
    });
    it('should reject an csv file with wrong format', function(done) {
      var fileContent = 'code;text\n1;foo\n2;bar';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.be.rejectedWith('No flashbands found.').and.notify(done);
    });
  });
});
//
