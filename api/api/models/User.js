/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  autoCreatedAt: true,
  attributes: {
    nickname: { type: 'string' },
    password: { type: 'string' },
    tokens:   { collection: 'token', via: 'user' }
  }
};
