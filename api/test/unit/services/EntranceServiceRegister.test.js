var Q = require('q');
var chai = require('chai');
chai.should();
chai.use(require('chai-as-promised'));
var args;

describe('EntranceService', function() {
  describe('#checkRegistered', function() {
    beforeEach(function() {
      args = {flashband: '1234'};
    });

    // it('should not register entrance return false when ShowGoer not entry', function (done) {
    //   prmised = EntranceService.register(args.flashband);

    //   Q.all([
    //     prmised.should.eventually.have.property("id"),
    //     prmised.should.eventually.have.property("flashband", args.flashband)
    //   ]).should.notify(done);
    // });
  });
});
