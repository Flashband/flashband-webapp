'use strict';

var Q = require('q');
var fdHelp = require('../../helpers/FrontdoorHelper');

describe('FrontdoorService', function() {
  describe('#registerLeave', function() {
    it('should not register leave when flashband not imported', function (done) {
      FrontdoorService.registerLeave('0000000001').should.be.rejectedWith('Flashband not found.').notify(done);
    });

    it('should not register leave when ShowGoer blocked flashband', function (done) {
      var verifyFlashBandBlocked = function(flashBlocked) {
        FrontdoorService.registerLeave(flashBlocked.tag).should.be.rejectedWith('Blocked flashband.').notify(done);
      };

      fdHelp.createEntranceAndBlocked().then(verifyFlashBandBlocked, done);
    });

    it('should register leave when ShowGoer go home', function (done) {
      var verifyLeave = function(entrance) {
        var promise = FrontdoorService.registerLeave(entrance.tag);

        Q.all([
          promise.should.eventually.have.property('leave'),
          promise.should.eventually.have.property('tag', entrance.tag)
        ]).should.notify(done);
      };

      fdHelp.createEntrance().then(verifyLeave, done);
    });

    it('should not register leave when ShowGoer already out', function (done) {
      var verifyDuplicated = function(entrance) {
        FrontdoorService.registerLeave(entrance.tag).should.be.rejectedWith('Duplicated exit.').notify(done);
      };

      fdHelp.createLeave().then(verifyDuplicated, done);
    });
  });
});
