'use strict';

module.exports = {
  block: function blockFlashbands(req, res) {
    FlashbandService.block(req.param('tag'))
    .then(function() {
      res.ok({ message: 'Flashband blocked.' });
    }).fail(function(err) {
      res.forbidden(err);
    });
  },
  enable: function enableFlashbands(req, res) {
    res.created(req.body);
  }
};
