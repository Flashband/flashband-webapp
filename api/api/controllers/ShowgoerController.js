'use strict';

var processError = function(res) {
  return function(reason) {
    res.badRequest(reason.message);
  };
};

module.exports = {
  find: function (req, res) {
    ShowgoerService.search(req.query).then(res.ok).fail(processError(res));
  },

  create: function create (req, res) {
    var showgoerParams = req.body;
    ShowgoerService.create(showgoerParams).then(res.created).fail(processError(res));
  },

  summary: function(req, res) {
    ShowgoerService.summary().then(res.ok).fail(processError(res));
  },

  search: function(req, res) {
    var args;

    if (req.query.s) {
      args = {
        or: [{ name: { 'contains': req.query.s }},
             { docNumber: { 'contains': req.query.s }}]
      };
    }

    ShowgoerService.search(args).then(res.ok, function(ranson) {
      res.badRequest(ranson.message);
    });
  },

  associate: function(req, res) {
    var showGoerId = req.param('showgoerId');
    var flashBandTag = req.param('tag');

    ShowgoerService.associate(showGoerId, flashBandTag).then(res.ok).fail(processError(res));
  }
};
