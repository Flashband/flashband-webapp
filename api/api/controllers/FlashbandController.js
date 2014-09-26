module.exports = {
  block: function(req, res) {
    FlashbandService.block(req.param('tag'))
    .then(function() {
      res.ok({ message: 'Flashband blocked.' });
    }).fail(function(err) {
      res.forbidden(err);
    });
  }
};
