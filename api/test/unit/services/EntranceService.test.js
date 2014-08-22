var Sails = require('sails');
var expect = require('expect.js');

describe('EntranceService', function() {
  describe('#register', function() {
    it('should create an Entrance', function (done) {
      EntranceService.register('1234', function(err, entrance) {
        expect(err).to.be(null);
        expect(entrance).to.have.property('flashband', '1234');
        Entrance.find({flashband: '1234'}).exec(function(err, flashbands) {
          expect(flashbands).to.have.length(1);
          done();
        });
      });
    });
    it('should not register an flashband already registered', function (done) {
      Entrance.create({flashband: '11223344'}).exec(function(err, flashband) {
        EntranceService.register('11223344', function(err, entrance) {
          expect(entrance).to.be(null);
          expect(err).to.not.be(null);
          expect(err).to.have.property('message', 'duplicated entrance');
          done();
        });
      });
    });
  });
});
