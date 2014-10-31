'use strict';

module.exports = function (req, res, next) {

  // @todo: handle authentication over sockets. I suggest modifing the whole
  // authentication service and system to match Kasper Isager's generator for
  // authentication using Passport, which handles sockets pretty well.
  // Generator: https://github.com/kasperisager/sails-generate-auth
  if (req.isSocket) return next();

  var spliter = req.headers.authorization.split('Token token=');
  if (!req.headers.authorization) { return res.unauthorized(); }

  var token = false;

  if (spliter.length === 2) { token = spliter[1]; }
  if (!token) { return res.unauthorized(); }

  AuthenticateService.checkTokenValid(token).then(function(allowed) {
    if (!allowed) { return res.unauthorized(); }
    next();
  }).fail(function(err) {
    res.serverError(err);
  });
};
