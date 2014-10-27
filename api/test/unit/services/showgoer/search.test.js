'use strict';

var expect = require('chai').use(require('chai-as-promised')).expect;
var dbHelp = require('../../../helpers/DatabaseHelper');
var fbHelp = require('../../../helpers/FlashbandHelper');
var showgoer = null;
var flashband = null;
var findParams = null;
var expectList = null;

describe('ShowgoerService', function() {
  describe('#search', function() {
    beforeEach(function(done) {
      dbHelp.emptyModels([Showgoer]).then(function() {
        ShowgoerService.create({name: 'Fulano de Tal', docType: 'cpf', docNumber: '111.111.111-11'}).then(function(obj) {
          findParams = {name: 'Fulano de Tal'};
          showgoer = obj;

          fbHelp.createSuccess().then(function(flb) {
            flashband = flb;

            expectList = function(status, zone, done) {
              ShowgoerService.search(findParams).then(function(listFinders) {
                expect(listFinders).to.have.length(1, 'Wrong number of showgoers');
                expect(listFinders[0]).to.have.property('zone', zone);
                expect(listFinders[0]).to.have.property('status', status);
                done();
              });
            };

            done();
          });
        });
      });
    });

    it('showgoers with status: not associated', function(done) {
      var statusNotFound = 'not';
      var emptyZone = '';
      expectList(statusNotFound, emptyZone, done);
    });

    it('showgoers with status: associated and did not enter', function(done) {
      var statusOut = 'out';
      var emptyZone = '';

      ShowgoerService.associate(showgoer.id, flashband.tag).then(function() {
        expectList(statusOut, emptyZone, done);
      }, done);
    });

    it('showgoers with status: associated and ever enter', function(done) {
      var statusIn = 'in';
      var zoneOne  = '1';

      ShowgoerService.associate(showgoer.id, flashband.tag).then(function() {
        FrontdoorService.registerEnter({tag: flashband.tag, zone: zoneOne}).then(function() {
          expectList(statusIn, zoneOne, done);
        });
      });
    });
  });
});
