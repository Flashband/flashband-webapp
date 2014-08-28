module.exports = {
  enter: function(req, res) {
    FrontdoorService.register(req.param('tag')).then(function(entrance) {
      res.created();
    }).fail(function (error) {
      res.forbidden(error, { 'Content-Type': 'text/plain' });
    });
  }
};
