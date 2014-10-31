'use strict';

var expect = require('chai').use(require('chai-as-promised')).expect;
var stringReadableStream = require('../../../helpers/StringReadableStream');

describe('FlashbandBatchImporter', function () {

  describe('#parse', function() {
    it('should import one valid flashband', function(done) {
      var fileContent = 'Qrcode      ;UID \n000001;80 28 53 3A 0A 83 04';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.deep.equal([{tag: '8028533A0A8304', serial: '000001'}]).and.notify(done);
    });

    it('should ignore empty flashbands', function(done) {
      var fileContent = 'Qrcode      ;UID \n;\n000001;80 28 53 3A 0A 83 04';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.deep.equal([{tag: '8028533A0A8304', serial: '000001'}]).and.notify(done);
    });

    it('should reject files with duplicated UID', function(done) {
      var fileContent = 'Qrcode      ;UID \n000001;80 28 53 3A 0A 83 04\n000002;80 28 53 3A 0A 83 04';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.be.rejected.and.deep.equal([{line: 3, error: 'Duplicated UID.'}]).and.notify(done);
    });

    it('should reject files with duplicated Qrcode', function(done) {
      var fileContent = 'Qrcode      ;UID \n000001;80 28 53 3A 0A 83 04\n000001;00 00 00 00 00 00 00';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.be.rejected.and.deep.equal([{line: 3, error: 'Duplicated Qrcode.'}]).and.notify(done);
    });

    it('should reject empty file', function(done) {
      var fileContent = '';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.be.rejected.and.deep.equal([{line: 1, error: 'No flashbands found.'}]).and.notify(done);
    });

    it('should reject invalid flashbands (without UID)', function(done) {
      var fileContent = 'Qrcode      ;UID \n000001;80 28 53 3A 0A 83 04\n000002;';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.be.rejected.and.deep.equal([{line: 3, error: 'Missing UID.'}]).and.notify(done);
    });

    it('should reject invalid flashbands (without Qrcode)', function(done) {
      var fileContent = 'Qrcode      ;UID \n000001;80 28 53 3A 0A 83 04\n;11 22 33 44 55 66 77';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.be.rejected.and.deep.equal([{line: 3, error: 'Missing Qrcode.'}]).and.notify(done);
    });

    it('should not treat flashbands with missing Qrcode as duplicated', function(done) {
      var fileContent = 'Qrcode      ;UID \n000001;80 28 53 3A 0A 83 04\n;11 22 33 44 55 66 77\n;22 33 44 55 66 77 88';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.be.rejected.and.deep.equal([{line: 3, error: 'Missing Qrcode.'}, {line: 4, error: 'Missing Qrcode.'}]).and.notify(done);
    });

    it('should reject invalid flashbands (Number of tag\'s pairs nonstandard)', function(done) {
      var fileContent = 'Qrcode      ;UID \n000001;80 28 53 3A 0A 83 04\n000002;80 28 53 3A 0A 83';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.be.rejected.and.deep.equal([{line: 3, error: 'Number of tag\'s pairs nonstandard.'}]).and.notify(done);
    });

    it('should allow flashbands (Number of tag\'s without spaces to pairs)', function(done) {
      var fileContent = 'Qrcode      ;UID \n000001;8028533A0A8304\n000002;8028533A0A8333';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.deep.equal([{tag: '8028533A0A8304', serial: '000001'},{tag: '8028533A0A8333', serial: '000002'}]).and.notify(done);
    });

    it('should reject file without flashbands', function(done) {
      var fileContent = 'Qrcode      ;UID ';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.be.rejected.and.deep.equal([{line: 1, error: 'No flashbands found.'}]).and.notify(done);
    });

    it('should reject file with only empty flashbands', function(done) {
      var fileContent = 'Qrcode      ;UID \n;\n;\n';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.be.rejected.and.deep.equal([{line: 1, error: 'No flashbands found.'}]).and.notify(done);
    });

    it('should reject an csv file with wrong format', function(done) {
      var fileContent = 'code;text\n1;foo\n2;bar';
      var importFile = stringReadableStream.createReadableStream(fileContent);
      expect(FlashbandBatchImporter.parse(importFile)).to.eventually.be.rejected.and.deep.equal([{line: 1, error: 'No flashbands found.'}]).and.notify(done);
    });
  });
});
