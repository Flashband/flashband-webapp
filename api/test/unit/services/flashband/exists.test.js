'use strict';

var expect = require('chai').use(require('chai-as-promised')).expect;
var fbHelp = require('../../../helpers/FlashbandHelper');

describe('FlashbandService', function() {
  describe('#exists', function() {
    it('should check if a flashband exists', function(done) {
      var verifyFlashbandExists = function(flashSuccess) {
        expect(FlashbandService.exists(flashSuccess.tag)).to.eventually.have.property('tag', flashSuccess.tag).and.notify(done);
      };

      fbHelp.createSuccess().then(verifyFlashbandExists, done);
    });

    it('should check for a flashband that not exists', function(done) {
      expect(FlashbandService.exists('111111')).to.be.rejectedWith('Flashband not found').and.notify(done);
    });
  });
});
