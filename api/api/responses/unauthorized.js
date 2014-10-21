'use strict';

module.exports = function sendUnauthorized(data) {
  this.res.defaulted(401, data);
};
