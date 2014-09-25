/*globals FlashbandService, FlashbandBatch, FlashbandBatchImporter*/
'use strict';
var fs = require('fs');

module.exports = {
  block: function blockFlashbands(req, res) {
    FlashbandService.block(req.param('tag'))
    .then(function() {
      res.ok({ message: 'Flashband blocked.' });
    }).fail(res.forbidden);
  },
  enable: function enableFlashbands(req, res) {
    req.file('flashbands').upload(function (err, files) {
      if (err) {
        return res.serverError(err);
      }
      var file = files[0];
      var csvFile = fs.createReadStream(file.fd);
      FlashbandBatchImporter.parse(csvFile).then(function(flashbands) {
        FlashbandService.enable(flashbands, req.body.name, fs.readFileSync(file.fd)).then(function(flashbandBatch) {
          return res.created({flashbands_enabled: flashbandBatch.flashbands.length, message: 'Flashbands enabled successfully.' });
        }).fail(res.badRequest);

      }).fail(res.badRequest);
    });
  }
};
