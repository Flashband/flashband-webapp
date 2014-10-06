module.exports = function (req, res, next) {
  if (!req.headers.authorization) return res.unauthorized();

  var spliter = req.headers.authorization.split("Token token=");
  var token = false;

  if (spliter.length === 2) token = spliter[1];
  if (!token) return res.unauthorized();

  AuthenticateService.checkTokenValid(token).then(function(allowed) {
    if (!allowed) return res.unauthorized();
    next();
  }).fail(function(err) {
    res.serverError(err);
  });
};
