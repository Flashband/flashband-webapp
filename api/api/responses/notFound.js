'use strict';

module.exports = function sendNotFound(data) {
  this.res.defaulted(404, data);
};
