var Q = require('q');
var expect = require('chai').use(require('chai-as-promised')).expect;

describe('FlashbandService', function() {

  describe('#exists', function() {
    beforeEach(function(done) {
      Flashband.drop();
      done();
    });

    it('should check if a flashband exists', function(done) {
      Q(Flashband.create({flashband: '223344', serial: 1})).then(function(flashband) {
        expect(FlashbandService.exists('223344')).to.eventually.be.equal(true).and.notify(done);
      }, function(reason) {expect.fail(reason);});
    });
    it('should check for a flashband that not exists', function(done) {
      expect(FlashbandService.exists('111111')).to.eventually.be.equal(false).and.notify(done);
    });
  });
});
