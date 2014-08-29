var expect = require('chai').use(require('chai-as-promised')).expect;
var FlashbandHelper = require('../../helpers/FlashbandHelper');

describe('FlashbandService', function() {
  describe('#exists', function() {
    it('should check if a flashband exists', function(done) {
      var verifyFlashbandExists = function(flashSuccess) {
        expect(FlashbandService.exists(flashSuccess.tag)).to.eventually.be.equal(true).and.notify(done);
      };

      FlashbandHelper.createSuccess().then(verifyFlashbandExists, done);
    });

    it('should check for a flashband that not exists', function(done) {
      expect(FlashbandService.exists('111111')).to.eventually.be.equal(false).and.notify(done);
    });
  });
});
