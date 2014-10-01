var expect = require('chai').use(require('chai-as-promised')).expect;
//var FlashbandHelper = require('../../helpers/FlashbandHelper');

describe('ShowgoerService', function() {
  describe('#create', function() {
    it('should save showgoer', function(done) {
      var showgoer = {name: 'Fulano de Tal', doctype: 'cpf', docnumber: '111.111.111-11'};
      expect(ShowgoerService.create(showgoer)).to.eventually.have.property('id').and.notify(done);
    });

    it('should require name', function(done) {
      var showgoer = {name: '', doctype: 'cpf', docnumber: '111.111.111-11'};
      expect(ShowgoerService.create(showgoer)).to.eventually.be.rejectedWith('Name is required.').and.notify(done);
    });

    it('should require doctype', function(done) {
      var showgoer = {name: 'Fulano de Tal', doctype: '', docnumber: '111.111.111-11'};
      expect(ShowgoerService.create(showgoer)).to.eventually.be.rejectedWith('Document type is required.').and.notify(done);
    });
    it('should require docnumber', function(done) {
      var showgoer = {name: 'Fulano de Tal', doctype: 'cpf', docnumber: ''};
      expect(ShowgoerService.create(showgoer)).to.eventually.be.rejectedWith('Document number is required.').and.notify(done);
    });
    it('should accept cpf', function(done) {
      var showgoer = {name: 'Fulano de Tal', doctype: 'cpf', docnumber: 'cpf-number'};
      expect(ShowgoerService.create(showgoer)).to.eventually.have.property('cpf', 'cpf-number').and.notify(done);
    });
    it('should accept cnh', function(done) {
      var showgoer = {name: 'Fulano de Tal', doctype: 'cnh', docnumber: 'cnh-number'};
      expect(ShowgoerService.create(showgoer)).to.eventually.have.property('cnh', 'cnh-number').and.notify(done);
    });
    it('should accept rg', function(done) {
      var showgoer = {name: 'Fulano de Tal', doctype: 'rg', docnumber: 'rg-number'};
      expect(ShowgoerService.create(showgoer)).to.eventually.have.property('rg', 'rg-number').and.notify(done);
    });
    it('should accept passport', function(done) {
      var showgoer = {name: 'Fulano de Tal', doctype: 'passport', docnumber: 'passport-number'};
      expect(ShowgoerService.create(showgoer)).to.eventually.have.property('passport', 'passport-number').and.notify(done);
    });
    it('should reject invalid doctype', function(done) {
      var showgoer = {name: 'Fulano de Tal', doctype: 'inv', docnumber: 'invalid-doctype'};
      expect(ShowgoerService.create(showgoer)).to.eventually.be.rejectedWith('Invalid document type.').and.notify(done);
    });
    it('should reject duplicated document number and type', function(done) {
      var showgoer = {name: 'Fulano de Tal', doctype: 'rg', docnumber: 'some-rg'};
      ShowgoerService.create(showgoer).then(function() {
        expect(ShowgoerService.create(showgoer)).to.eventually.be.rejectedWith('Duplicated document.').and.notify(done);
      }).fail(done);
    });
  });
});
