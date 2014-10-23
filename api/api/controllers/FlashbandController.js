'use strict';

var fs = require('fs');

module.exports = {
  block: function(req, res) {
    FlashbandService.block(req.param('tag')).then(function(flashband) {
      res.ok({ message: 'Flashband blocked.', showgoer: flashband.showgoer });
    }).fail(function(err) {
      res.forbidden(err.message);
    });
  },

  enable: function(req, res) {
    req.file('flashbands').upload(function (err, files) {
      if (err) { return res.serverError(err); }

      var file = files[0];
      var csvFile = fs.createReadStream(file.fd);

      FlashbandBatchImporter.parse(csvFile).then(function(flashbands) {
        FlashbandService.enable(flashbands, req.body.name, fs.readFileSync(file.fd)).then(function(flashbandBatch) {
          res.created({flashbandsEnabled: flashbandBatch.flashbands.length, message: 'Flashbands enabled successfully.' });
        }).fail(res.badRequest);
      }).fail(res.badRequest);
    });
  },

  summary: function(req, res) {
    Flashband.count({imported: true}).exec(function(err, count) {
      if (err) { return res.serverError(err); }
      res.ok({total: count});
    });
  }
};
