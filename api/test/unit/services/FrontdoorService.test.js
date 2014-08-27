var expect = require('chai').use(require('chai-as-promised')).expect;
var sinon = require('sinon');
var Q = require('q');

describe('FrontdoorService', function() {
  describe('#register', function() {
    var flashbandServiceExistsStub;

    beforeEach(function(done) {
      flashbandServiceExistsStub = null;
      Entrance.drop(done);
    });

    afterEach(function(done) {
      if (flashbandServiceExistsStub) flashbandServiceExistsStub.restore();
      done();
    });

    var stubFlashbandExists = function(exists) {
      flashbandServiceExistsStub = sinon.stub(FlashbandService, 'exists').returns(Q(exists));
    };

    it('should create an Entrance', function (done) {
      stubFlashbandExists(true);

      Q(FrontdoorService.register('1234')).then(function(entrance) {
        expect(entrance).to.have.property('flashband', '1234');
        expect(Entrance.count({flashband: '1234'})).to.eventually.equal(1).and.notify(done);
      }).catch(function(reason) {
        expect.fail(reason);
        done();
      });
    });

    it('should not register entrance when non existing flashband', function (done) {
      stubFlashbandExists(false);
      expect(FrontdoorService.register('5678')).to.be.rejectedWith('Flashband not found.').and.notify(done);
    });
  });
});
