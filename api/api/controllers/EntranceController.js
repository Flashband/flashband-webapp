/**
 * EntranceController
 *
 * @description :: Server-side logic for managing Entrances
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
  create: function(req, res) {
    EntranceService.register(req.flb).then(function(entrance) {
      res.created();
    }).fail(function (error) {
      res.forbidden(error);
    });
  }
};
