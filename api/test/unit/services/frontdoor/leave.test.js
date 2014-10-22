'use strict';

var Q = require('q');
var fdHelp = require('../../../helpers/FrontdoorHelper');
var fbHelp = require('../../../helpers/FlashbandHelper');

describe('FrontdoorService', function() {
  describe('#registerLeave', function() {
    it('should not register leave when flashband not imported', function (done) {
      FrontdoorService.registerLeave({tag: '0000000001', zone: '1'}).should.be.rejectedWith('Flashband not found.').notify(done);
    });

    it('should not register leave when ShowGoer blocked flashband', function (done) {
      var verifyFlashBandBlocked = function(flashBlocked) {
        FrontdoorService.registerLeave({tag: flashBlocked.tag, zone: '1'}).should.be.rejectedWith('Blocked flashband.').notify(done);
      };

      fdHelp.createEntranceAndBlocked().then(verifyFlashBandBlocked, done);
    });

    it('should register leave when ShowGoer go home', function (done) {
      var verifyLeave = function(entrance) {
        var promise = FrontdoorService.registerLeave({tag: entrance.tag, zone: '1'});

        Q.all([
          promise.should.eventually.have.property('leave'),
          promise.should.eventually.have.property('tag', entrance.tag)
        ]).should.notify(done);
      };

      fdHelp.createEntrance().then(verifyLeave, done);
    });

    it('should not register leave when ShowGoer already out', function (done) {
      var verifyDuplicated = function(entrance) {
        FrontdoorService.registerLeave({tag: entrance.tag, zone: '1'}).should.be.rejectedWith('Duplicated exit.').notify(done);
      };

      fdHelp.createLeave().then(verifyDuplicated, done);
    });

    it('should not register leave when flashband is not associated', function (done) {
      var verifyLeave = function(flashband) {
        var promisedEntrance = FrontdoorService.registerLeave({tag: flashband.tag, zone: '1'});
        promisedEntrance.should.be.rejectedWith('Flashband not associated.').and.notify(done);
      };

      fbHelp.createSuccess().then(verifyLeave, done);
    });
  });
});
