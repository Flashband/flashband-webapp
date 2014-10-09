'use strict';

module.exports = {
  autoCreatedAt: true,
  attributes: {
    tag: {
      type: 'string',
      unique: true
    },
    serial: { type: 'string', columnName: 'srl' },
    blockedAt: { type: 'datetime', columnName: 'blkd_at' },

    blocked: function() {
      return Boolean(this.blockedAt);
    }
  }
};
