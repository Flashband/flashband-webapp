var getFlashbandTag = function(req) {
  return req.param('tag');
};

module.exports = {
  enter: function(req, res) {
    FrontdoorService.registerEnter(getFlashbandTag(req)).then(function(entrance) {
      res.created();
    }).fail(function (error) {
      res.forbidden(error, { 'Content-Type': 'text/plain' });
    });
  },

  leave: function(req, res) {
    FrontdoorService.registerLeave(getFlashbandTag(req)).then(function(entrance) {
      res.created();
    }).fail(function (error) {
      res.forbidden(error, { 'Content-Type': 'text/plain' });
    });
  }
};
