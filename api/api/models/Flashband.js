/**
* Flashband.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  autoCreatedAt: true,
  attributes: {
    tag: { 
      type: 'string',
      unique: true
    },
    showgoer: {
      model: 'Showgoer'
    },
    serial: { type: 'string', columnName: 'srl' },
    blockedAt: { type: 'datetime', columnName: 'blkd_at' },

    blocked: function() {
      return Boolean(this.blockedAt);
    }
  },
};
