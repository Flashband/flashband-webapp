'use strict';

var expect = require('chai').use(require('chai-as-promised')).expect;
var fbHelp = require('../../../helpers/FlashbandHelper');
var sgHelp = require('../../../helpers/ShowgoerHelper');

describe('FlashbandService', function() {
  describe('#associate', function() {
    it('should associate a showgoer', function shouldAssociateShowgoer(done) {

      sgHelp.create().then(function afterShowgoerCreate(showgoer) {
        fbHelp.createSuccess().then(function(flashband) {
          expect(ShowgoerService.associate(showgoer.id, flashband.tag)).to.eventually
            .have.property('showgoer').that
            .have.property('id', showgoer.id)
            .and.notify(done);
        }).fail(done);
      }).fail(done);
    });

    it('should reject a flashband blocked', function shouldRejectFlashbandBlocked(done) {
      sgHelp.create().then(function afterShowgoerCreate(showgoer) {
        fbHelp.createBlocked().then(function expectRejectFlashbandBlocked(flashband) {
          expect(ShowgoerService.associate(showgoer.id, flashband.tag)).to.be.rejectedWith('Blocked Flashband').and.notify(done);
        }, done);
      }, done);
    });

    it('should reject a showgoer already associated', function shouldRejectShowgoerEverAssociated(done) {
      sgHelp.create().then(function afterShowgoerCreate(showgoer) {
        fbHelp.createSuccess().then(function expectAssociateShowGoer(flashband) {
          ShowgoerService.associate(showgoer.id, flashband.tag).then(function(associated) {
            fbHelp.createSuccess().then(function expectAssociateShowGoer(newFlashband) {
              expect(ShowgoerService.associate(associated.showgoer.id, newFlashband.tag)).to.be.rejectedWith('Showgoer ever associated').and.notify(done);
            }, done);
          }, done);
        }, done);
      }, done);
    });

    it('should reject a flashband already associated', function shouldRejectShowgoerEverAssociated(done) {
      sgHelp.create().then(function afterShowgoerCreate(showgoer) {
        fbHelp.createSuccess().then(function expectAssociateShowGoer(flashband) {
          ShowgoerService.associate(showgoer.id, flashband.tag).then(function(associated) {
            sgHelp.create().then(function afterShowgoerCreate(newShowgoer) {
              expect(ShowgoerService.associate(newShowgoer.id, associated.tag)).to.be.rejectedWith('Flashband ever associated').and.notify(done);
            }, done);
          }, done);
        }, done);
      }, done);
    });

    it('should associate a new flashband when old flashband be blocked', function shouldRejectFlashbandBlocked(done) {
      sgHelp.create().then(function afterShowgoerCreate(showgoer) {
        fbHelp.createSuccess().then(function rejectFlashbandBlocked(flashband) {
          ShowgoerService.associate(showgoer.id, flashband.tag).then(function(associated) {
            FlashbandService.block(associated.tag).then(function() { //function(blocked)
              fbHelp.createSuccess().then(function expectAssociateShowGoer(newFlashband) {
                expect(ShowgoerService.associate(showgoer.id, newFlashband.tag)).to.eventually.have.property('showgoer').that.have.property('id', showgoer.id).and.notify(done);
              }, done);
            }, done);
          }, done);
        }, done);
      }, done);
    });
  });
});
