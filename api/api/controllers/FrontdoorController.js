'use strict';

var getFlashbandTag = function(req) {
  return req.param('tag');
};

var inputSuccessful  = function(showgoer) { return {door: 'in',  message: 'Input successful.', showgoer: showgoer}; };
var outputSuccessful = function(showgoer) { return {door: 'out', message: 'Output successful.', showgoer: showgoer}; };

module.exports = {
  enter: function(req, res) {
    var tag = getFlashbandTag(req);
    FrontdoorService.registerEnter(tag).then(function() {
      FlashbandService.findOne(tag).then(function(flashband) {
        if (flashband.showgoer) {
          ShowgoerService.findOne(flashband.showgoer).then(function(showgoer) {
            res.created(inputSuccessful(showgoer));
          }).fail(function(reason) {
            res.forbidden(reason.message);
          });
        } else {
          res.created(inputSuccessful(null));
        }
      }).fail(function(reason) {
        res.forbidden(reason.message);
      });
    }).fail(function(reason) {
      res.forbidden(reason.message);
    });
  },

  leave: function(req, res) {
    var tag = getFlashbandTag(req);
    FrontdoorService.registerLeave(tag).then(function() {
      FlashbandService.findOne(tag).then(function(flashband) {
        if (flashband.showgoer) {
          ShowgoerService.findOne(flashband.showgoer).then(function(showgoer) {
            res.created(outputSuccessful(showgoer));
          }).fail(function(reason) {
            res.forbidden(reason.message);
          });
        } else {
          res.created(outputSuccessful(null));
        }
      }).fail(function(reason) {
        res.forbidden(reason.message);
      });
    }).fail(function(reason) {
      res.forbidden(reason.message);
    });
  },

  cross: function(req, res) {
    var tag = getFlashbandTag(req);

    FrontdoorService.checkRegistered(tag).then(function (inside) {
      FrontdoorService[inside ? 'registerLeave' : 'registerEnter'](tag).then(function () {
        FlashbandService.findOne(tag).then(function(flashband) {
          if (flashband.showgoer) {
            ShowgoerService.findOne(flashband.showgoer).then(function(showgoer) {
              if (inside) { return res.created(outputSuccessful(showgoer)); }
              res.created(inputSuccessful(showgoer));
            }).fail(function(reason) {
              res.forbidden(reason.message);
            });
          } else {
            if (inside) { return res.created(outputSuccessful(null)); }
            res.created(inputSuccessful(null));
          }
        }).fail(function(reason) {
          res.forbidden(reason.message);
        });
      }).fail(function(reason) {
        res.forbidden(reason.message);
      });
    }).fail(function(reason) {
      res.forbidden(reason.message);
    });
  }
};
