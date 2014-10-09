'use strict';

var expect = require('chai').use(require('chai-as-promised')).expect;
var fbHelp = require('../../helpers/FlashbandHelper');
var sgHelp = require('../../helpers/ShowgoerHelper');

describe('FlashbandService', function() {
  describe('#associate', function() {
    it('should associate a showgoer', function shouldAssociateShowgoer(done) {
      sgHelp.create().then(function afterShowgoerCreate(showgoer) {
        fbHelp.createSuccess().then(function associateShowGoerAndFlashband(flashband) {
          expect(ShowgoerService.associate(showgoer.id, flashband.tag)).to.eventually.have.property('user', showgoer.id).and.notify(done);
        }, done);
      }, done);
    });

    it('should reject flashband blocked', function shouldRejectFlashbandBlocked(done) {
      sgHelp.create().then(function afterShowgoerCreate(showgoer) {
        fbHelp.createBlocked().then(function rejectFlashbandBlocked(flashband) {
          expect(ShowgoerService.associate(showgoer.id, flashband.tag)).to.be.rejectedWith('Blocked Flashband').and.notify(done);
        }, done);
      }, done);
    });

    it('should associate a new flashband when old flashband be blocked', function shouldRejectFlashbandBlocked(done) {
      sgHelp.create().then(function afterShowgoerCreate(showgoer) {
        fbHelp.createSuccess().then(function rejectFlashbandBlocked(flashband) {
          ShowgoerService.associate(showgoer.id, flashband.tag).then(function(associated) {
            FlashbandService.block(associated.tag).then(function() { //function(blocked)
              fbHelp.createSuccess().then(function associateShowGoerAndFlashband(newFlashband) {
                expect(ShowgoerService.associate(showgoer.id, newFlashband.tag)).to.eventually.have.property('user', showgoer.id).and.notify(done);
              }, done);
            }, done);
          }, done);
        }, done);
      }, done);
    });
  });
});
