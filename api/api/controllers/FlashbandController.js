'use strict';

var fs = require('fs');

module.exports = {
  block: function block (req, res) {
    FlashbandService.block(req.param('tag')).then(function() {
      res.ok({ message: 'Flashband blocked.' });
    }).fail(function(err) {
      res.forbidden(err.message);
    });
  },

  enable: function enable(req, res) {
    req.file('flashbands').upload(function (err, files) {
      if (err) {
        return res.serverError(err);
      }
      var file = files[0];
      var csvFile = fs.createReadStream(file.fd);
      FlashbandBatchImporter.parse(csvFile).then(function(flashbands) {
        FlashbandService.enable(flashbands, req.body.name, fs.readFileSync(file.fd)).then(function(flashbandBatch) {
          return res.created({flashbandsEnabled: flashbandBatch.flashbands.length, message: 'Flashbands enabled successfully.' });
        }).fail(res.badRequest);
      }).fail(res.badRequest);
    });
  },

  summary: function summary(req, res) {
    Flashband.count().exec(function(err, count) {
      if (err) { return res.serverError(err); }
      res.ok({total: count});
    });
  }
};
