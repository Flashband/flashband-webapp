var expect = require('chai').use(require('chai-as-promised')).expect;
var FlashbandHelper = require('../../helpers/FlashbandHelper');

describe('FrontdoorService #registerEnter', function() {
  it ('should reject blocked flashband', function(done) {
    var verifyBlockedFlashband = function(flashBlocked) {
      var promise = FrontdoorService.registerEnter(flashBlocked.tag);
      expect(promise).to.be.rejectedWith('Blocked flashband.').and.notify(done);
    };

    FlashbandHelper.createBlocked(expect).then(verifyBlockedFlashband, done);
  });

  it ('should allow non blocked flashband', function(done) {
    var verifyFlashBandAllowed = function(flashSuccess) {
      var promise = FrontdoorService.registerEnter(flashSuccess.tag);
      expect(promise).to.eventually.have.property('tag', flashSuccess.tag).and.notify(done);
    };

    FlashbandHelper.createSuccess().then(verifyFlashBandAllowed, done);
  });
});
