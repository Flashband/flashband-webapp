'use strict';

module.exports = function sendDefaulted (status, data) {
  var res = this.res;
  var req = this.req;

  req._sails.log.silly('Sending ' + status + ' response: \n', data);

  res.status(status);

  res.falshbandResponse = {
    status: status,
    data: data
  };

  if (typeof data === 'object') { return res.json(data); }
  if ((data) && (data.name) && (data.name.toString() === 'Error')) { return res.json(data.message); }
  res.jsonx(data);
};
