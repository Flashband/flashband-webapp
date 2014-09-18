/*globals FlashbandService, FlashbandBatch*/
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
    req.file('flashbands').upload(function (err) { //}, files) {
      // console.log('********************************************************************************');
      // console.log('req.query');
      // console.log(req.query);
      // console.log('req.params');
      // console.log(req.params);
      // console.log('req.body');
      // console.log(req.body);
      // console.log('files');
      // console.log(files);
      // console.log(files.length + ' file(s) uploaded successfully!');
      // console.log('********************************************************************************');
      if (err)
        return res.serverError(err);

      FlashbandBatch.create({name: req.body.name});

      return res.created({ message: 'Flashbands enabled successfully.' });
    });
  }
};
