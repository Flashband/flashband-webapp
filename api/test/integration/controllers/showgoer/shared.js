'use strict';
var expect         = require('chai').expect;

module.exports = {
  verifyShowgoer: function(actual, expected) {
    this.verifyShowgoerName(actual, expected);
    this.verifyShowgoerDocType(actual, expected);
    this.verifyShowgoerDocNumber(actual, expected);
    expect(actual).to.have.property('id');
    expect(actual).to.have.property('createdAt');
    expect(actual).to.have.property('updatedAt');

  },

  verifyShowgoerName: function(actual, expected) {
    expect(actual).to.have.property('name', expected.name);
  },

  verifyShowgoerDocType: function(actual, expected) {
    expect(actual).to.have.property('docType', expected.docType);
  },

  verifyShowgoerDocNumber: function(actual, expected) {
    expect(actual).to.have.property('docNumber', expected.docNumber);
  }
};
