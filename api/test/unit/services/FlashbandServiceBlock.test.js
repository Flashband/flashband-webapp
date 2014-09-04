var expect = require('chai').use(require('chai-as-promised')).expect;
var FlashbandHelper = require('../../helpers/FlashbandHelper');

describe('FlashbandService', function() {
  describe('#block', function() {
    it('should set flashband blockedAt', function(done) {
      FlashbandHelper.createSuccess().then(function(flashband) {
        expect(FlashbandService.block(flashband.tag))
        .to.eventually.have.property('blockedAt')
        .and.be.ok
        .and.notify(function(err) {
          if (err) return done(err);
          expect(Flashband.findOne({ tag: flashband.tag }))
          .to.eventually.have.property('blockedAt')
          .and.be.ok.and.notify(done);
        });
      }).fail(done);
    });

    it('should not allow blocking a non-existing flashband', function(done) {
      expect(FlashbandService.block('non-existing'))
        .to.be.rejectedWith('Flashband not found.')
        .and.notify(done);
    });

    it('should not block an already blocked flashband', function(done) {
      FlashbandHelper.createBlocked().then(function(blockedFlashband) {
        var originalBlockedAt = blockedFlashband.blockedAt;
        expect(FlashbandService.block(blockedFlashband.tag))
        .to.be.rejectedWith('Flashband already blocked.')
        .and.notify(function(err) {
          if (err) return done(err);
          Flashband.findOne({tag: blockedFlashband.tag}).then(function(flashband) {
            if (!flashband) throw 'saved flashband not found! :-/';
            expect(flashband.blockedAt).to.eql(originalBlockedAt);
            done();
          }).fail(done);
        });
      }).fail(done);
    });
  });
});
