'use strict';

module.exports = function sendForbidden (data) {
  this.req._sails.log.silly('Sending 403 ("Forbidden") response: \n', data);

  var res = this.res;
  res.status(403);

  if (typeof data === 'object') { return res.json(data); }
  if ((data) && (data.name) && (data.name.toString() === 'Error')) { return res.json(data.message); }
  res.jsonx(data);
};
