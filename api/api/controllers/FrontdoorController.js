'use strict';

var getFlashbandArgs = function(req) {
  return {
    tag: req.param('tag'),
    zone: req.param('zone')
  };
};

var inputSuccessful  = {door: 'in',  message: 'Input successful.'};
var outputSuccessful = {door: 'out', message: 'Output successful.'};

module.exports = {
  enter: function(req, res) {
    FrontdoorService.registerEnter(getFlashbandArgs(req)).then(function() {
      res.created(inputSuccessful);
    }).fail(function(ranson) {
      res.forbidden(ranson.message);
    });
  },

  leave: function(req, res) {
    FrontdoorService.registerLeave(getFlashbandArgs(req)).then(function() {
      res.created(outputSuccessful);
    }).fail(function(ranson) {
      res.forbidden(ranson.message);
    });
  },

  cross: function(req, res) {
    var crossArgs = getFlashbandArgs(req);

    FrontdoorService.checkRegistered(crossArgs).then(function (inside) {
      return FrontdoorService[inside ? 'registerLeave' : 'registerEnter'](crossArgs).then(function () {
        if (inside) { return res.created(outputSuccessful); }
        res.created(inputSuccessful);
      });
    }).fail(function(ranson) {
      res.forbidden(ranson.message);
    });
  }
};
