var Q = require('q');
var chai = require('chai');
var validFlashband;
var FlashbandHelper = require('../../helpers/FlashbandHelper');

chai.should();
chai.use(require('chai-as-promised'));

describe('FrontdoorService', function() {
  describe('#registerLeave', function() {
    beforeEach(function(done) {
      FlashbandHelper.createSuccess().then(function(flashSuccess) {
        validFlashband = flashSuccess;
        done();
      }, done);
    });

    it('should register output when ShowGoer go home.', function (done) {
      var promised = FrontdoorService.registerLeave(validFlashband.tag);

      Q.all([
        promised.should.eventually.have.property('date'),
        promised.should.eventually.have.property('tag', validFlashband.tag)
        ]).should.notify(function(err, results) {
          done();
        });
    });
  });
});
