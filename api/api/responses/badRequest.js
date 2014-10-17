'use strict';

module.exports = function sendBadRequest (data) {
  this.req._sails.log.silly('Sending 400 ("Bad Request") response: \n', data);

  var res = this.res;
  res.status(400);

  if (typeof data === 'object') { return res.json(data); }
  if ((data) && (data.name) && (data.name.toString() === 'Error')) { return res.json(data.message); }
  res.jsonx(data);
};
