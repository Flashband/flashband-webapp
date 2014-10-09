'use strict';

module.exports = function sendCreated (data) {
  this.req._sails.log.silly('Sending 202 ("Accepted") response: \n', data);

  var res = this.res;
  res.status(202);

  if (typeof data === 'object') { return res.json(data); }
  if ((data) && (data.name) && (data.name.toString() === 'Error')) { return res.json(data.message); }
  res.jsonx(data);
};
