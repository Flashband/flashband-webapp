var expect = require('chai').use(require('chai-as-promised')).expect;

describe('FrontdoorService #register', function() {
  it ('should reject blocked flashband', function(done) {
    Flashband.create({uid: '3456', serial: 1, blockedAt: new Date()}).then(function() {
      var promise = FrontdoorService.register('3456');
      expect(promise).to.be.rejectedWith('Blocked flashband.').and.notify(done);
    }).fail(function(reason) {
      expect.fail(reason);
    });
  });

  it ('should allow non blocked flashband', function(done) {
    Flashband.create({uid: '4567', serial: 1, blockedAt: null}).then(function(flashband) {
      var promise = FrontdoorService.register('4567');
      expect(promise).to.eventually.have.property('flashband', '4567').and.notify(done);
    });
  });
});
