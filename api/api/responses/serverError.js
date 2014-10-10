'use strict';

module.exports = function sendServerError (data) {
  this.req._sails.log.silly('Sending 500 ("Server Error") response: \n', data);

  var res = this.res;
  res.status(500);

  if (typeof data === 'object') { return res.json(data); }
  if ((data) && (data.name) && (data.name.toString() === 'Error')) { return res.json(data.message); }
  res.jsonx(data);
};
