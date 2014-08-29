var Q = require('q');
var expect = require('chai').use(require('chai-as-promised')).expect;
var FrontdoorHelper = require('../../helpers/FrontdoorHelper');

describe('FrontdoorService', function() {
  describe('#registerLeave', function() {
    it('should not register leave when flashband not imported', function (done) {
      FrontdoorService.registerLeave('0000000001').should.be.rejectedWith('Flashband not found.').notify(done);
    });

    it('should not register leave when ShowGoer blocked flashband', function (done) {
      var verifyFlashBandBlocked = function(flashBlocked) {
        FrontdoorService.registerLeave(flashBlocked.tag).should.be.rejectedWith('Blocked flashband.').notify(done);
      };

      FrontdoorHelper.createEntranceAndBlocked().then(verifyFlashBandBlocked, done);
    });

    it('should register leave when ShowGoer go home', function (done) {
      var verifyLeave = function(entrance) {
        var promise = FrontdoorService.registerLeave(entrance.tag);

        Q.all([
          promise.should.eventually.have.property('leave'),
          promise.should.eventually.have.property('tag', entrance.tag)
        ]).should.notify(done);
      };

      FrontdoorHelper.createEntrance().then(verifyLeave, done);
    });

    it('should not register leave when ShowGoer already out', function (done) {
      var verifyDuplicated = function(flashSuccess) {
        FrontdoorService.registerLeave(flashSuccess.tag).should.be.rejectedWith('Duplicated exit.').notify(done);
      };

      FrontdoorHelper.createLeave().then(verifyDuplicated, done);
    });
  });
});
