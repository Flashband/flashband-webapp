var expect = require('chai').use(require('chai-as-promised')).expect;
var databaseHelper = require('../../helpers/DatabaseHelper');
var flashbandBatchHelper = require('../../helpers/FlashbandBatchHelper');
var flashbandHelper = require('../../helpers/FlashbandHelper');

describe('FlashbandService', function() {
  describe('#enable', function() {
    beforeEach(function(done) {
      databaseHelper.emptyModels([Flashband, FlashbandBatch]).finally(done);
    });

    it('should associate flashband in', function(done) {
      var expectAssociation = function(flashbandBatch) {
        FlashbandBatch.findOne(flashbandBatch.id).populate('flashbands').then(function(saved) {
          expect(saved).to.be.ok;
          expect(saved.flashbands).to.have.length(1, 'wrong number of associated flashbands');
          expect(saved.flashbands[0]).to.have.property('tag', '123456');
          FlashbandBatch.findOne(flashbandBatch.id).then(function(flashbandBatch) {
            expect(flashbandBatch).to.not.have.property('flashbands');
          });
          done();
        }).fail(done);
      };
      FlashbandService.enable([ {tag: '123456', serial: 1} ], 'lote 1').then(function() {
          FlashbandBatch.findOne({name:'lote 1'}).then(expectAssociation).fail(done);
        })
      .fail(done);
    });
    it('should ensure use waterline association FlashbandBatch -> Flashband', function(done) {
      FlashbandService.enable([{ tag: '123456', serial: 1 }], 'lote 1', 'batch-file-content').then(function() {
          FlashbandBatch.findOne({name:'lote 1'}).then(function(flashbandBatch) {
            expect(flashbandBatch.flashbands).to.have.length(0);
            done();
          }).fail(done);
        }).fail(done);
    });
    it('should save received batch file', function(done) {
      FlashbandService.enable([{ tag: '123456', serial: 1 }], 'lote 1', 'batch-file-content').then(function() {
          FlashbandBatch.findOne({name:'lote 1'}).then(function(flashbandBatch) {
            expect(flashbandBatch).to.have.property('file', 'batch-file-content');
            done();
          }).fail(done);
        }).fail(done);
    });
    it('should activate created flashbandBatch', function(done) {
      FlashbandService.enable([{ tag: '123456', serial: 1 }], 'lote 1').then(function() {
          FlashbandBatch.findOne({name:'lote 1'}).then(function(flashbandBatch) {
            expect(flashbandBatch.active).to.be.ok;
            done();
          }).fail(done);
        }).fail(done);
    });
    it('should inactivate prior active flashband batch', function (done) {
      flashbandBatchHelper.createActive('lote 1').then(function(priorFlashbandBatch) {
        FlashbandService.enable([{ tag: '123456', serial: 1 }], 'lote 2').then(function() {
          FlashbandBatch.findOne(priorFlashbandBatch.id).then(function(flashbandBatch) {
            expect(flashbandBatch.active).to.be.not.ok;
            done();
          }).fail(done);
        }).fail(done);
      }).fail(done);
    });
    it('should destroy existing flashbands', function (done) {
      flashbandHelper.createSuccess('123456').then(function(flashband) {
        FlashbandService.enable([{ tag: '234567', serial: 1 }], 'lote 1').then(function() {
          Flashband.findOne({tag: '123456'}).then(function(savedFlashband) {
            expect(savedFlashband).to.be.not.ok;
            Flashband.find().then(function(flashbands) {
              expect(flashbands).to.have.length(1);
              expect(flashbands[0]).to.have.property('tag', '234567');
              done();
            }).fail(done);
          }).fail(done);
        }).fail(done);
      }).fail(done);
    });
    it('should reject duplicated flashbands', function(done) {
      var flashbands = [ { tag: '123456', serial: 1 }, { tag: '123456', serial: 1 } ];
      expect(FlashbandService.enable(flashbands, 'lote 1')).to.be.rejected.and.notify(done);
    });
  });
});
