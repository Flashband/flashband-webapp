var Q = require('q');
var chai = require('chai');
chai.should();
chai.use(require('chai-as-promised'));
var args;
var FlashbandHelper = require('../../helpers/FlashbandHelper');

describe('FrontdoorService', function() {
  describe('#registerEnter', function() {
    beforeEach(function(done) {
      args = {tag: '1234'};
      done();
    });

    it('should not register entrance when ShowGoer already in', function (done) {
      var verifyFlashBandBlocked = function(flashSuccess ) {
        var expectDuplicated = function(err, entranceModel) {
          FrontdoorService.registerEnter(flashSuccess.tag).should.be.rejectedWith('Duplicated entrance.').notify(done);
        };

        Entrance.create({tag: flashSuccess.tag}, expectDuplicated);
      };

      FlashbandHelper.createSuccess().then(verifyFlashBandBlocked, done);
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
      var promised = FrontdoorService.registerEnter(args.tag);

      Q.all([
        promised.should.eventually.have.property('id'),
        promised.should.eventually.have.property('tag', args.tag)
        ]).should.notify(function(err, results) {
          done();
        });
    });
  });
});
