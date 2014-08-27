module.exports = {
  create: function(req, res) {
    EntranceService.register(req.param('tag')).then(function(entrance) {
      res.created();
    }).fail(function (error) {
      res.forbidden(error);
    });
  }
};
