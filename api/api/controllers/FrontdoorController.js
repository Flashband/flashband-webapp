var getFlashbandTag = function(req) {
  return req.param('tag');
};

module.exports = {
  enter: function(req, res) {
    FrontdoorService.registerEnter(getFlashbandTag(req)).then(function() {
      res.created();
    }).fail(function (error) {
      res.forbidden(error, { 'Content-Type': 'text/plain' });
    });
  },

  leave: function(req, res) {
    FrontdoorService.registerLeave(getFlashbandTag(req)).then(function() {
      res.created();
    }).fail(function (error) {
      res.forbidden(error, { 'Content-Type': 'text/plain' });
    });
  },

  cross: function(req, res) {
    var tag = getFlashbandTag(req);
    FrontdoorService.checkRegistered(tag).then(function (inside) {
      FrontdoorService[inside ? 'registerLeave' : 'registerEnter'](tag)
        .then(function (result) {
          result.inside = inside;
          res.created(result);
        })
        .catch(res.forbidden)
    });
  }
};
