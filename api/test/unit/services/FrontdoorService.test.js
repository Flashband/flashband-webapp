var expect = require('chai').use(require('chai-as-promised')).expect;
var sinon = require('sinon');
var Q = require('q');
var flashbandServiceExistsStub;

var stubFlashbandExists = function(exists) {
  var deferred = Q.defer();
  deferred.resolve(exists);

  flashbandServiceExistsStub = sinon.stub(FlashbandService, 'exists').returns(deferred.promise);
};

describe('FrontdoorService', function() {
  describe('#register', function() {
    beforeEach(function(done) {
      flashbandServiceExistsStub = null;
      Entrance.drop(done);
    });

    it('should create an Entrance', function (done) {
      stubFlashbandExists(true);

      var verifyRegisterEntrance = function(entrance) {
        expect(entrance).to.have.property('tag', '1234');
        expect(Entrance.count({tag: '1234'})).to.eventually.equal(1).and.notify(done);
      };

      FrontdoorService.registerEnter('1234').then(verifyRegisterEntrance, done);
    });

    it('should not register entrance when non existing flashband', function (done) {
      stubFlashbandExists(false);
      expect(FrontdoorService.registerEnter('5678')).to.be.rejectedWith('Flashband not found.').and.notify(done);
    });

    afterEach(function(done) {
      if (flashbandServiceExistsStub) flashbandServiceExistsStub.restore();
      done();
    });
  });
});
