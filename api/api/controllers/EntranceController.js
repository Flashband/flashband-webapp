module.exports = {
  create: function(req, res) {
    EntranceService.register(req.param('flb')).then(function(entrance) {
      res.created();
    }).fail(function (error) {
      res.forbidden(error);
    });
  }
};
