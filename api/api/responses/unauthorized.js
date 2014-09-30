module.exports = function unauthorized(data) {
  var res = this.res;
  var sails = this.req._sails;

  // Set status code
  res.status(401);

  // Log error to console
  if (data !== undefined)
    sails.log.verbose('Sending 401 ("Unauthorized") response: \n',data);
  else
    sails.log.verbose('Sending 401 ("Unauthorized") response');

  return res.json(data);
};

