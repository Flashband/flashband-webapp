'use strict';

var getFlashbandTag = function(req) {
  return req.param('tag');
};

var inputSuccessful  = {door: 'in',  message: 'Input successful.'};
var outputSuccessful = {door: 'out', message: 'Output successful.'};

module.exports = {
  enter: function enter (req, res) {
    FrontdoorService.registerEnter(getFlashbandTag(req)).then(function() {
      res.created(inputSuccessful);
    }).fail(function(ranson) {
      res.forbidden(ranson.message);
    });
  },

  leave: function leave (req, res) {
    FrontdoorService.registerLeave(getFlashbandTag(req)).then(function() {
      res.created(outputSuccessful);
    }).fail(function(ranson) {
      res.forbidden(ranson.message);
    });
  },

  cross: function cross (req, res) {
    var tag = getFlashbandTag(req);

    FrontdoorService.checkRegistered(tag).then(function (inside) {
      FrontdoorService[inside ? 'registerLeave' : 'registerEnter'](tag).then(function () {
        if (inside) { return res.created(outputSuccessful); }
        res.created(inputSuccessful);
      }).fail(function(ranson) {
        res.forbidden(ranson.message);
      });
    }).fail(function(ranson) {
      res.forbidden(ranson.message);
    });
  }
};
