'use strict';

module.exports = function sendOk(data) {
  this.res.defaulted(200, data);
};
