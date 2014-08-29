var Q = require('q');
var expect = require('chai').use(require('chai-as-promised')).expect;
var FrontdoorHelper = require('../../helpers/FrontdoorHelper');

describe('FrontdoorService', function() {
  describe('#registerEnter', function() {
    it('should register entrance when ShowGoer not already in', function (done) {
      var verifyLeave = function(entrance) {
        var promise = FrontdoorService.registerLeave(entrance.tag);

        Q.all([
          promise.should.eventually.have.property('leave'),
          promise.should.eventually.have.property('tag', entrance.tag)
        ]).should.notify(done);
      };

      FrontdoorHelper.createEntrance().then(verifyLeave, done);
    });
  });
});
