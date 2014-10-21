'use strict';

module.exports = function sendBadRequest(data) {
  this.res.defaulted(400, data);
};
