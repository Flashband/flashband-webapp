var expect = require('chai').use(require('chai-as-promised')).expect;
var FlashbandHelper = require('../../helpers/FlashbandHelper');

describe('FlashbandService', function() {
  describe('#block', function() {
    it('should set flashband blockedAt', function(done) {
      FlashbandHelper.createSuccess().then(function(flashband) {
        expect(FlashbandService.block(flashband.tag))
        .to.eventually.have.property('blockedAt')
        .be.ok.and.notify(done);
      }, done);
    });

    it('should persist blocked flashband', function(done) {
      FlashbandHelper.createSuccess().then(function(flashband) {
        FlashbandService.block(flashband.tag).then(function(flashband) {
          expect(Flashband.findOne({ tag: flashband.tag }))
          .to.eventually.have.property('blockedAt')
          .and.be.ok.and.notify(done);
        }, done);
      }, done);
    });

    //it('should not allow blocking a non-existing flashband', function(done) {
      //expect(FlashbandService.block('non-existing'))
        //.to.be.rejectedWith('Flashband not found.')
        //.and.notify(done);
    //});
  });
});
