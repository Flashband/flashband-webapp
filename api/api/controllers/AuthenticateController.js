module.exports = {
  login: function login (req, res) {
    var email = req.param('email');
    var password = req.param('password');

    AuthenticateService.webLogin(email, password).then(res.accepted).fail(res.unauthorized);
  },

  authenticate: function authenticate (req, res) {
    var password = req.param('password');
    AuthenticateService.mobileLogin(password).then(res.accepted).fail(res.unauthorized);
  }
};
