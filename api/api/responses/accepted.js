module.exports = function sendAccepted(data) {
  var res = this.res;
  var sails = this.req._sails;

  sails.log.silly('res.accepted() :: Sending 202 ("Accepted") response');

  res.status(202);
  return res.jsonx(data);
};
