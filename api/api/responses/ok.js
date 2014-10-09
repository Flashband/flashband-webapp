'use strict';

module.exports = function sendOK (data) {
  this.req._sails.log.silly('Sending 200 ("OK") response: \n', data);

  var res = this.res;
  res.status(200);

  if (typeof data === 'object') { return res.json(data); }
  if ((data) && (data.name) && (data.name.toString() === 'Error')) { return res.json(data.message); }
  res.jsonx(data);
};
