'use strict';

var expect = require('chai').use(require('chai-as-promised')).expect;
var databaseHelper = require('../../../helpers/DatabaseHelper');
var flashbandBatchHelper = require('../../../helpers/FlashbandBatchHelper');
var flashbandHelper = require('../../../helpers/FlashbandHelper');

describe('FlashbandService', function() {
  describe('#enable', function() {
    beforeEach(function(done) {
      databaseHelper.emptyModels([Flashband, FlashbandBatch]).finally(done);
    });

    it('should associate flashband in', function(done) {
      var expectAssociation = function(err, flashbandBatch) {
        if (err) { return done(err); }

        FlashbandBatch.findOne(flashbandBatch.id).populate('flashbands').exec(function(err, saved) {
          if (err) { return done(err); }

          expect(saved).to.be.ok;
          expect(flashbandBatch).to.have.property('flashbands');
          expect(saved.flashbands).to.have.length(1, 'wrong number of associated flashbands');
          expect(saved.flashbands[0]).to.have.property('tag', '123456');
          done();
        });
      };

      FlashbandService.enable([ {tag: '123456', serial: 1} ], 'lote 1').then(function() {
        FlashbandBatch.findOne({name:'lote 1'}).exec(expectAssociation);
      }).fail(done);
    });

    it('should ensure use waterline association FlashbandBatch -> Flashband', function(done) {
      FlashbandService.enable([{ tag: '123456', serial: 1 }], 'lote 1', 'batch-file-content').then(function() {
        FlashbandBatch.findOne({name:'lote 1'}).exec(function(err, flashbandBatch) {
          if (err) { return done(err); }
          expect(flashbandBatch.flashbands).to.have.length(0);
          done();
        });
      }).fail(done);
    });

    it('should save received batch file', function(done) {
      FlashbandService.enable([{ tag: '123456', serial: 1 }], 'lote 1', 'batch-file-content').then(function() {
        FlashbandBatch.findOne({name:'lote 1'}).exec(function(err, flashbandBatch) {
          if (err) { return done(err); }
          expect(flashbandBatch).to.have.property('file', 'batch-file-content');
          done();
        });
      }).fail(done);
    });

    it('should activate created flashbandBatch', function(done) {
      FlashbandService.enable([{ tag: '123456', serial: 1 }], 'lote 1').then(function() {
        FlashbandBatch.findOne({name:'lote 1'}).exec(function(err, flashbandBatch) {
          if (err) { return done(err); }

          expect(flashbandBatch.active).to.be.ok;

          done();
        });
      }).fail(done);
    });

    it('should inactivate prior active flashband batch', function (done) {
      flashbandBatchHelper.createActive('lote 1').then(function(priorFlashbandBatch) {
        FlashbandService.enable([{ tag: '123456', serial: 1 }], 'lote 2').then(function() {
          FlashbandBatch.findOne(priorFlashbandBatch.id).exec(function(err, flashbandBatch) {
            if (err) { return done(err); }

            expect(flashbandBatch.active).to.be.not.ok;

            done();
          });
        }).fail(done);
      });
    });

    it('should destroy existing flashbands', function (done) {
      flashbandHelper.createSuccess('123456').then(function() {
        FlashbandService.enable([{ tag: '234567', serial: 1 }], 'lote 1').then(function() {
          Flashband.findOne({ tag: '123456', imported: true}).exec(function(err, savedFlashband) {
            if (err) { return done(err); }

            expect(savedFlashband).to.be.not.ok;

            Flashband.find({imported: true}).exec(function(err, flashbands) {
              if (err) { return done(err); }
              expect(flashbands).to.have.length(1);
              expect(flashbands[0]).to.have.property('tag', '234567');
              done();
            });
          });
        }).fail(done);
      });
    });

    it('should re-import flashbands (due only one batch allowed per event)', function (done) {
      FlashbandService.enable([{ tag: '234567', serial: 1 }], 'lote 1').then(function() {
        FlashbandService.enable([{ tag: '234567', serial: 1 }], 'lote 1').then(function() {
          Flashband.findOne({ tag: '123456', imported: true}).exec(function(err, savedFlashband) {
            if (err) { return done(err); }

            expect(savedFlashband).to.be.not.ok;

            Flashband.find({imported: true}).exec(function(err, flashbands) {
              if (err) { return done(err); }
              expect(flashbands).to.have.length(1);
              expect(flashbands[0]).to.have.property('tag', '234567');
              done();
            });
          });
        }).fail(done);
      }).fail(function(err) { done(new Error(err)); });
    });

    it('should reject duplicated flashbands', function(done) {
      var flashbands = [ { tag: '123456', serial: 1 }, { tag: '123456', serial: 1 } ];
      expect(FlashbandService.enable(flashbands, 'lote 1')).to.be.rejected.and.notify(done);
    });
  });
});
