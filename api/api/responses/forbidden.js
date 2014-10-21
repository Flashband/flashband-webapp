'use strict';

module.exports = function sendForbidden(data) {
  this.res.defaulted(403, data);
};
