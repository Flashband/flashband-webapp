var expect = require('chai').use(require('chai-as-promised')).expect;

describe('FlashbandService', function() {

  describe('#exists', function() {
    it('should check if a flashband exists', function(done) {
      Flashband.create({uid: '223344', serial: 1}).then(function() {
        expect(FlashbandService.exists('223344')).to.eventually.be.equal(true).and.notify(done);
      }).fail(function(reason) {expect.fail(reason);});
    });

    it('should check for a flashband that not exists', function(done) {
      expect(FlashbandService.exists('111111')).to.eventually.be.equal(false).and.notify(done);
    });
  });
});
