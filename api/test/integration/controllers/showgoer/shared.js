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
    if (expected.name) {
      expect(actual).to.have.property('name', expected.name);
    } else {
      expect(true).to.be(false, 'expected showgoer name not specified');
    }
  },

  verifyShowgoerDocType: function(actual, expected) {
    if (expected.docType) {
      expect(actual).to.have.property('docType', expected.docType);
    } else {
      expect(true).to.be(false, 'expected showgoer docType not specified');
    }
  },

  verifyShowgoerDocNumber: function(actual, expected) {
    if (expected.docType) {
      expect(actual).to.have.property('docNumber', expected.docNumber);
    } else {
      expect(true).to.be(false, 'expected showgoer docNumber not specified');
    }
  }
};
