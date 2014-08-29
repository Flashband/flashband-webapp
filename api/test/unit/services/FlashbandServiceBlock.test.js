var expect = require('chai').use(require('chai-as-promised')).expect;
var FlashbandHelper = require('../../helpers/FlashbandHelper');

describe('FlashbandService', function() {
  describe('#block', function() {
    it('should set flashband blockedAt', function(done) {
      FlashbandHelper.createSuccess().then(function(flashband) {
        expect(FlashbandService.block(flashband.uid))
        .to.eventually.have.property('blockedAt')
        .and.be.ok.and.notify(done);
      }, done);
    });

    it('should persist blocked flashband', function(done) {
      FlashbandHelper.createSuccess()
      .then(function(flashband) {
        FlashbandService.block(flashband.uid).then(function(flashband) {
          expect(Flashband.findOne({ uid: flashband.uid }))
          .to.eventually.have.property('blockedAt')
          .and.be.ok.and.notify(done);
        }, done);
      }, done);
    });

    it('should check for a flashband that not exists (PROPOSED)', function(done) {
      throw new Error('not yet implemented');
    });
  });
});
