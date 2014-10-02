module.exports = function badRequest(data) {
  var res = this.res;
  var sails = req = this.req._sails;

  res.status(400);

  if (data !== undefined)
    sails.log.verbose('Sending 400 ("Bad Request") response: \n',data);
  else
    sails.log.verbose('Sending 400 ("Bad Request") response');

  return res.jsonx(data);
};

