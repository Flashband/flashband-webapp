/*globals FlashbandService, FlashbandBatch, FlashbandBatchImporter, Flashband*/
'use strict';
var fs = require('fs');

module.exports = {
  block: function blockFlashbands(req, res) {
    FlashbandService.block(req.param('tag')).then(function() {
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
  },

  summary: function summary(req, res) {
    Flashband.count().then(function(count) {
      res.ok({total: count});
    }).fail(res.serverError);
  }
};
