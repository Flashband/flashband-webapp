var expect = require('chai').use(require('chai-as-promised')).expect;
//var FlashbandHelper = require('../../helpers/FlashbandHelper');

describe('ShowgoerService', function() {
  describe('#create', function() {
    it('should save showgoer', function(done) {
      var showgoer = {name: 'Fulano de Tal', doctype: 'cpf', docnumber: '111.111.111-11'};
      expect(ShowgoerService.create(showgoer)).to.eventually.have.property('id').and.notify(done);
    });
  });
});
