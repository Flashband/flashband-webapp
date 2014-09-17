module.exports = {
  authenticate: function(req, res) {
    var password = req.param('password');

    AuthenticateService.login(password).then(res.accepted).fail(res.unauthorized);
  }
};
