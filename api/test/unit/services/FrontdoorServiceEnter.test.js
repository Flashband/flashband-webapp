'use strict';

var Q = require('q');
var fbHelp = require('../../helpers/FlashbandHelper');
var fdHelp = require('../../helpers/FrontdoorHelper');

describe('FrontdoorService', function() {
  describe('#registerEnter', function() {
    it('should not register entrance when ShowGoer already in', function (done) {
      var verifyDuplicated = function(flashSuccess) {
        FrontdoorService.registerEnter(flashSuccess.tag).should.be.rejectedWith('Duplicated entrance.').notify(done);
      };

      fdHelp.createEntrance().then(verifyDuplicated, done);
    });

    it('should not register entrance when ShowGoer blocked flashband', function (done) {
      var verifyFlashBandBlocked = function(flashBlocked ) {
        FrontdoorService.registerEnter(flashBlocked.tag).should.be.rejectedWith('Blocked flashband.').notify(done);
      };

      fbHelp.createBlocked().then(verifyFlashBandBlocked, done);
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

      fbHelp.createSuccess().then(verifyEntrance);
    });
  });
});
