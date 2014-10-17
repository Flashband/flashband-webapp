'use strict';

module.exports = function sendUnauthorized (data) {
  this.req._sails.log.silly('Sending 401 ("Unauthorized") response: \n', data);

  var res = this.res;
  res.status(401);

  if (typeof data === 'object') { return res.json(data); }
  if ((data) && (data.name) && (data.name.toString() === 'Error')) { return res.json(data.message); }
  res.jsonx(data);
};
