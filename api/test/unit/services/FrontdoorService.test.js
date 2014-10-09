'use strict';

var expect = require('chai').use(require('chai-as-promised')).expect;
var dbHelp = require('../../helpers/DatabaseHelper');
var fbHelp = require('../../helpers/FlashbandHelper');

describe('FrontdoorService', function() {
  describe('#register', function() {
    beforeEach(function(done) {
      dbHelp.emptyModels([Entrance]).finally(done);
    });

    it('should create an Entrance', function (done) {
      fbHelp.createSuccess().then(function verifyRegisterEntrance(flashband) {
        expect(FrontdoorService.registerEnter(flashband.tag)).to.eventually.have.property('tag', flashband.tag).and.notify(done);
      }, done);
    });

    it('should not register entrance when non existing flashband', function (done) {
      expect(FrontdoorService.registerEnter('5678')).to.be.rejectedWith('Flashband not found.').and.notify(done);
    });
  });
});
