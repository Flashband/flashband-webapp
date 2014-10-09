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
  });
});
