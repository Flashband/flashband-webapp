'use strict';

module.exports = {
  autoCreatedAt: true,
  attributes: {
    user: { model:'user' },
    token: { type: 'string' }
  }
};
