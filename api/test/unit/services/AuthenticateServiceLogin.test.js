var expect = require('chai').use(require('chai-as-promised')).expect;
var FlashbandHelper = require('../../helpers/FlashbandHelper');

describe('AuthenticateService', function() {
  describe('#login', function() {
    it('should return token and user when set a valid password', function(done) {
      var verifyFlashbandExists = function(flashSuccess) {
        expect(FlashbandService.exists(flashSuccess.tag)).to.eventually.be.equal(true).and.notify(done);
      };

      FlashbandHelper.createSuccess().then(verifyFlashbandExists, done);
    });
  });
});
