var expect = require('chai').use(require('chai-as-promised')).expect;
//var FlashbandHelper = require('../../helpers/FlashbandHelper');

describe('FlashbandService', function() {
  describe('#enable', function() {
    it('should associate flashband in', function(done) {
      var expectAssociation = function(flashbandBatch) {
        FlashbandBatch.findOne(flashbandBatch.id).populate('flashbands').then(function(saved) {
          expect(saved).to.be.ok;
          expect(saved.flashbands).to.have.length(1, 'wrong number of associated flashbands');
          expect(saved.flashbands[0]).to.have.property('tag', '123456');
          done();
        }).fail(done);
      };
      FlashbandService.enable([ {tag: '123456', serial: 1} ], 'lote 1')
        .then(function() {
          FlashbandBatch.findOne({name:'lote 1'}).then(expectAssociation).fail(done);
        })
      .fail(done);
    });
    it('should save received batch file');
    it('should reject existing flashbands');
    it('should reject duplcated flashbands');
  });
});
