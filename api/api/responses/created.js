module.exports = function sendCreated(data, options) {
  var res = this.res;
  var sails = this.req._sails;

  sails.log.silly('res.created() :: Sending 201 ("Created") response');

  res.status(201);

  return res.jsonx(data);
};
