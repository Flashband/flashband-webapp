module.exports = {
  create: function(req, res) {
    var password = req.param('password');

    AuthenticateService.login(password).then(function(auth) {
      res.accepted(auth);
    }).fail(function (error) {
      res.unauthorized(error);
    });
  }
};
