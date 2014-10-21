'use strict';

module.exports = function sendServerError(data) {
  this.res.defaulted(500, data);
};
