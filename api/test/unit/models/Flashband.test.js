var expect = require('chai').expect;

describe('Flashband model', function() {
  var flashband = null;

  beforeEach(function(done) {
    flashband = new Flashband._model({uid: '9876', serial: 1});
    done();
  });

  describe('#blocked', function() {
    it('should be false when blockedAt is not set', function(done) {
      flashband.blockedAt = null;
      expect(flashband.blocked()).to.be.eql(false);
      done();
    });

    it('should be true when blockedAt is set', function(done) {
      flashband.blockedAt = new Date();
      expect(flashband.blocked()).to.be.eql(true);
      done();
    });
  });
});
