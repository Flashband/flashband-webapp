'use strict';

require('chai').use(require('chai-as-promised')).should();
var fdHelp = require('../../../helpers/FrontdoorHelper');

describe('FrontdoorService', function() {
  describe('#checkRegistered', function() {
    it('should return false when ShowGoer not entry', function (done) {
      FrontdoorService.checkRegistered({tag: '1234', zone: '1'}).should.eventually.equal(false).notify(done);
    });

    it('should return true when ShowGoer ever entry', function (done) {
      fdHelp.createEntrance().then(function(entrance) {
        FrontdoorService.checkRegistered({tag: entrance.tag, zone: '1'}).should.eventually.equal(true).notify(done);
      });
    });
  });
});
