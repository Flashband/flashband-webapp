/**
 * AuthenticateController
 *
 * @description :: Server-side logic for managing authenticates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res) {
    var nickname = req.param('nickname');
    var password = req.param('password');

    AuthenticateService.login(nickname, password).then(function(token) {
      res.accepted(token);
    }).fail(function (error) {
      res.unauthorized(error);
    });
  }
};
