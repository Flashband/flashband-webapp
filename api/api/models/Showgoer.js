'use strict';

module.exports = {
  autoCreatedAt: true,
  attributes: {
    name: { type: 'string' },
    docType: { type: 'string' },
    docNumber: { type: 'string' },
    phone: { type: 'string' },
    vip: { type: 'boolean', defaultsTo: true }
  }
};
