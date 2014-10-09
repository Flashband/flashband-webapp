'use strict';

var expect = require('chai').use(require('chai-as-promised')).expect;
var fbHelp = require('../../helpers/FlashbandHelper');

describe('AuthenticateService', function() {
  describe('#login', function() {
    it('should return token and user when set a valid password', function(done) {
      var verifyFlashbandExists = function(flashSuccess) {
        expect(FlashbandService.exists(flashSuccess.tag)).to.eventually.be.equal(true).and.notify(done);
      };

      fbHelp.createSuccess().then(verifyFlashbandExists, done);
    });
  });
});
