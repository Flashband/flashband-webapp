'use strict';

module.exports = function sendNotFound (data) {
  this.req._sails.log.silly('Sending 404 ("Not Found") response: \n', data);

  var res = this.res;
  res.status(404);

  if (typeof data === 'object') { return res.json(data); }
  if ((data) && (data.name) && (data.name.toString() === 'Error')) { return res.json(data.message); }
  res.jsonx(data);
};
