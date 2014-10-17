'use strict';

module.exports = {
  login: function(req, res) {
    var email = req.param('email');
    var password = req.param('password');

    AuthenticateService.webLogin(email, password).then(res.accepted, res.unauthorized);
  },

  authenticate: function(req, res) {
    var password = req.param('password');
    AuthenticateService.mobileLogin(password).then(res.accepted, res.unauthorized);
  }
};
