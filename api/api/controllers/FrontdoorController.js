module.exports = {
  enter: function(req, res) {
    EntranceService.register(req.param('tag')).then(function(entrance) {
      res.created();
    }).fail(function (error) {
      res.forbidden(error);
    });
  }
};
