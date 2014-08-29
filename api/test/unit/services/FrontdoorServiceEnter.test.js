var Q = require('q');
var expect = require('chai').use(require('chai-as-promised')).expect;
var FlashbandHelper = require('../../helpers/FlashbandHelper');
var FrontdoorHelper = require('../../helpers/FrontdoorHelper');

describe('FrontdoorService', function() {
  describe('#registerEnter', function() {
    it('should not register entrance when ShowGoer already in', function (done) {
      var verifyDuplicated = function(flashSuccess) {
        FrontdoorService.registerEnter(flashSuccess.tag).should.be.rejectedWith('Duplicated entrance.').notify(done);
      };

      FrontdoorHelper.createEntrance().then(verifyDuplicated, done);
    });

    it('should not register entrance when ShowGoer already in', function (done) {
      var verifyFlashBandBlocked = function(flashBlocked ) {
        FrontdoorService.registerEnter(flashBlocked.tag).should.be.rejectedWith('Blocked flashband.').notify(done);
      };

      FlashbandHelper.createBlocked().then(verifyFlashBandBlocked, done);
    });

    it('should not register entrance when flashband not imported', function (done) {
      FrontdoorService.registerEnter('0000000001').should.be.rejectedWith('Flashband not found.').notify(done);
    });

    it('should register entrance when ShowGoer not already in', function (done) {
      var verifyEntrance = function(flashSuccess) {
        var promise = FrontdoorService.registerEnter(flashSuccess.tag);

        Q.all([
          promise.should.eventually.have.property('id'),
          promise.should.eventually.have.property('tag', flashSuccess.tag)
        ]).should.notify(done);
      };

      FlashbandHelper.createSuccess().then(verifyEntrance);
    });
  });
});
