'use strict';

var Q = require('q');
var fbHelp = require('../../../helpers/FlashbandHelper');
var fdHelp = require('../../../helpers/FrontdoorHelper');
var sgHelp = require('../../../helpers/ShowgoerHelper');

describe('FrontdoorService', function() {
  describe('#registerEnter', function() {
    it('should not register entrance when ShowGoer already in', function (done) {
      var verifyDuplicated = function(flashSuccess) {
        FrontdoorService.registerEnter({tag: flashSuccess.tag, zone: '1'}).should.be.rejectedWith('Duplicated entrance.').notify(done);
      };

      fdHelp.createEntrance().then(verifyDuplicated, done);
    });

    it('should not register entrance when ShowGoer blocked flashband', function (done) {
      var verifyFlashBandBlocked = function(flashBlocked ) {
        FrontdoorService.registerEnter({tag: flashBlocked.tag, zone: '1'}).should.be.rejectedWith('Blocked flashband.').notify(done);
      };

      fbHelp.createBlocked().then(verifyFlashBandBlocked, done);
    });

    it('should not register entrance when flashband not imported', function (done) {
      FrontdoorService.registerEnter({tag: '0000000001', zone: '1'}).should.be.rejectedWith('Flashband not found.').notify(done);
    });

    it('should not register entrance when flashband not associated', function (done) {
      var verifyEntrance = function(flashSuccess) {
        var promisedEntrance = FrontdoorService.registerEnter({tag: flashSuccess.tag, zone: '1'});
        promisedEntrance.should.be.rejectedWith('Flashband not associated.').and.notify(done);
      };
      fbHelp.createSuccess().then(verifyEntrance);
    });

    it('should register entrance when ShowGoer not already in', function (done) {
      var verifyEntrance = function(flashSuccess) {
        var promisedEntrance = FrontdoorService.registerEnter({tag: flashSuccess.tag, zone: '1'});

        Q.all([
          promisedEntrance.should.eventually.have.property('entrance').that.have.property('id'),
          promisedEntrance.should.eventually.have.property('entrance').that.have.property('tag', flashSuccess.tag)
        ]).should.notify(done);
      };
      fbHelp.createSuccess().then(function(flashband) {
        sgHelp.create().then(function(showgoer) {
          ShowgoerService.associate(showgoer.id, flashband.tag).then(function() {
            verifyEntrance(flashband);
          }).fail(done);
        }).fail(done);
      }).fail(done);
    });
  });
});
