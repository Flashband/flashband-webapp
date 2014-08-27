var chai = require('chai');
var args;
chai.should();
chai.use(require('chai-as-promised'));

describe('FrontdoorService', function() {
  describe('#checkRegistered', function() {
    beforeEach(function() {
      args = {flashband: '1234'};
    });

    it('should return false when ShowGoer not entry', function (done) {
      FrontdoorService.checkRegistered(args.flashband).should.eventually.equal(false).notify(done);
    });

    it('should return true when ShowGoer ever entry', function (done) {
      Entrance.create(args, function(err, entranceModel) {
        FrontdoorService.checkRegistered(args.flashband).should.eventually.equal(true).notify(done);
      });
    });
  });
});
