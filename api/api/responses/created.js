'use strict';

module.exports = function sendCreated (data) {
  this.req._sails.log.silly('Sending 201 ("Created") response: \n', data);

  var res = this.res;
  res.status(201);

  if (typeof data === 'object') { return res.json(data); }
  if ((data) && (data.name) && (data.name.toString() === 'Error')) { return res.json(data.message); }
  res.jsonx(data);
};
