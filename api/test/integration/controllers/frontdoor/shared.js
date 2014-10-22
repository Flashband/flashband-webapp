'use strict';

var expect = require('chai').expect;

var checkForShowgoer = function(bodyResponse) {
  expect(bodyResponse).to.have.property('showgoer').and.have.property('name', 'Fulano de Tal');
};

module.exports = {
  verifySuccessfulEnter: function(done) {
    return function(err, res) {
      if (err) return done(err);
      expect(res.body).to.include({ door: 'in', message: 'Input successful.' });
      checkForShowgoer(res.body);
      done();
    };
  },

  verifySuccessfulLeave: function(done) {
    return function(err, res) {
      if (err) return done(err);
      expect(res.body).to.include({door: 'out', message: 'Output successful.'});
      checkForShowgoer(res.body);
      done();
    };
  }
};
