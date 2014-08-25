var expect = require('expect.js');
var sinon = require('sinon');
var Q = require('q');

// describe('EntranceService', function() {
//   var flashbandServiceExistsStub;
//   beforeEach(function(done) {
//     flashbandServiceExistsStub = null;
//     done();
//   });

//   afterEach(function(done) {
//     if (flashbandServiceExistsStub) flashbandServiceExistsStub.restore();
//     done();
//   });
//   describe('#register', function() {
//     it('should create an Entrance', function (done) {
//       flashbandServiceExistsStub = sinon.stub(FlashbandService, 'exists').returns(true);
//       Q(EntranceService.register('1234')).then(function(err, entrance) {
//         expect(entrance).to.have.property('flashband', '1234');
//         Q(Entrance.find({flashband: '1234'})).then(function(flashbands) {
//           expect(flashbands).to.have.length(1);
//         });
//       }).finally(done);
//     });

//     it('should not register entrance when another entrance exists for same flashband', function (done) {
//       Entrance.create({flashband: '11223344'}).exec(function(err, flashband) {
//         EntranceService.register('11223344', function(err, entrance) {
//           expect(entrance).to.be(null);
//           expect(err).to.not.be(null);
//           expect(err).to.have.property('message', 'duplicated entrance');
//           done();
//         });
//       });
//     });

//     it('should not register entrance when flashband does not exists', function (done) {
//       flashbandServiceExistsStub = sinon.stub(FlashbandService, 'exists').returns(false);
//       Q(EntranceService.register('5678')).then(function(entrance) {
//         expect(entrance).to.be(null);
//         Q(Entrance.find({flashband: '5678'})).then(function(flashbands) {
//           expect(flashbands).to.have.length(0);
//         });
//       }).finally(done);
//     });
//   });
// });
