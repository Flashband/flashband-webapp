'use strict';

module.exports = function sendCreated(data) {
  this.res.defaulted(201, data);
};
