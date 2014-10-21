'use strict';

module.exports = function sendAccepted(data) {
  this.res.defaulted(202, data);
};
