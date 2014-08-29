var Q = require('q');
var chai = require('chai');
chai.should();
chai.use(require('chai-as-promised'));
var args;

describe('FrontdoorService', function() {
  describe('#registerEnter', function() {
    beforeEach(function(done) {
      args = {tag: '1234'};
      done();
    });

    it('should not register entrance when ShowGoer already in', function (done) {
      Entrance.create(args, function(err, entranceModel) {
        FrontdoorService.registerEnter(args.tag).should.be.rejectedWith('Duplicated entrance.').notify(done);
      });
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
