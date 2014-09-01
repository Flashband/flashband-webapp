var getFlashbandTag = function(req) {
  return req.param('tag');
};

var inputSuccessful  = {door: "in",  message: "Input successful."};
var outputSuccessful = {door: "out", message: "Output successful."};

module.exports = {
  enter: function(req, res) {
    FrontdoorService.registerEnter(getFlashbandTag(req)).then(function() {
      res.created(inputSuccessful);
    }).fail(function (error) {
      res.forbidden(error);
    });
  },

  leave: function(req, res) {
    FrontdoorService.registerLeave(getFlashbandTag(req)).then(function() {
      res.created(outputSuccessful);
    }).fail(function (error) {
      res.forbidden(error);
    });
  },

  cross: function(req, res) {
    var tag = getFlashbandTag(req);

    FrontdoorService.checkRegistered(tag).then(function (inside) {
      FrontdoorService[inside ? 'registerLeave' : 'registerEnter'](tag).then(function (result) {
        if (inside) return res.created(outputSuccessful);
        res.created(inputSuccessful);
      }).catch(res.forbidden)
    });
  }
};
