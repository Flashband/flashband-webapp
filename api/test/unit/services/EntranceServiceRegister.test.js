var Q = require('q');
var chai = require('chai');
chai.should();
chai.use(require('chai-as-promised'));
var args;

describe('EntranceService', function() {
  describe('#checkRegistered', function() {
    beforeEach(function() {
      args = {flashband: '1234'};
      Entrance.drop();
    });

    it('should not register entrance when ShowGoer already in', function (done) {
      var promised = EntranceService.register(args.flashband);

      Q.all([
        promised.should.eventually.have.property("id"),
        promised.should.eventually.have.property("flashband", args.flashband)
      ]).should.notify(done);
    });

    it('should register entrance when ShowGoer not already in', function (done) {


      Entrance.create(args, function(err, entranceModel) {
        EntranceService.register(args.flashband).should.be.rejectedWith(Error, 'Duplicated entrance.').notify(done);
      });
    });
  });
});
