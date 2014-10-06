var expect = require('chai').use(require('chai-as-promised')).expect;
var databaseHelper = require('../../helpers/DatabaseHelper');

describe('ShowgoerService', function() {
  describe('#create', function() {
    beforeEach(function(done) {
      databaseHelper.emptyModels([Showgoer]).then(done).fail(done);
    });

    it('should save showgoer', function(done) {
      var showgoer = {name: 'Fulano de Tal', docType: 'cpf', docNumber: '111.111.111-11'};
      expect(ShowgoerService.create(showgoer)).to.eventually.have.property('id').and.notify(done);
    });

    it('should require name', function(done) {
      var showgoer = {name: '', docType: 'cpf', docNumber: '111.111.111-11'};
      expect(ShowgoerService.create(showgoer)).to.eventually.be.rejectedWith('Name is required.').and.notify(done);
    });

    it('should require doctype', function(done) {
      var showgoer = {name: 'Fulano de Tal', docType: '', docNumber: '111.111.111-11'};
      expect(ShowgoerService.create(showgoer)).to.eventually.be.rejectedWith('Document type is required.').and.notify(done);
    });

    it('should require docNumber', function(done) {
      var showgoer = {name: 'Fulano de Tal', docType: 'cpf', docNumber: ''};
      expect(ShowgoerService.create(showgoer)).to.eventually.be.rejectedWith('Document number is required.').and.notify(done);
    });

    it('should accept cpf', function(done) {
      var showgoer = {name: 'Fulano de Tal', docType: 'cpf', docNumber: 'cpf-number'};

      ShowgoerService.create(showgoer).then(function(modelSG) {
        expect(modelSG).to.have.property('docType', 'cpf');
        expect(modelSG).to.have.property('docNumber', 'cpf-number');
        done();
      });
    });

    it('should accept cnh', function(done) {
      var showgoer = {name: 'Fulano de Tal', docType: 'cnh', docNumber: 'cnh-number'};

      ShowgoerService.create(showgoer).then(function(modelSG) {
        expect(modelSG).to.have.property('docType', 'cnh');
        expect(modelSG).to.have.property('docNumber', 'cnh-number');
        done();
      });
    });

    it('should accept rg', function(done) {
      var showgoer = {name: 'Fulano de Tal', docType: 'rg', docNumber: 'rg-number'};

      ShowgoerService.create(showgoer).then(function(modelSG) {
        expect(modelSG).to.have.property('docType', 'rg');
        expect(modelSG).to.have.property('docNumber', 'rg-number');
        done();
      });
    });

    it('should accept passport', function(done) {
      var showgoer = {name: 'Fulano de Tal', docType: 'passport', docNumber: 'passport-number'};

      ShowgoerService.create(showgoer).then(function(modelSG) {
        expect(modelSG).to.have.property('docType', 'passport');
        expect(modelSG).to.have.property('docNumber', 'passport-number');
        done();
      });
    });

    it('should reject invalid doctype', function(done) {
      var showgoer = {name: 'Fulano de Tal', docType: 'inv', docNumber: 'invalid-doctype'};
      expect(ShowgoerService.create(showgoer)).to.eventually.be.rejectedWith('Invalid document type.').and.notify(done);
    });

    it('should reject duplicated document number and type', function(done) {
      var showgoer = {name: 'Fulano de Tal', docType: 'rg', docNumber: 'some-rg'};
      ShowgoerService.create(showgoer).then(function() {
        expect(ShowgoerService.create(showgoer)).to.eventually.be.rejectedWith('Duplicated document.').and.notify(done);
      }).fail(done);
    });
  });
});
