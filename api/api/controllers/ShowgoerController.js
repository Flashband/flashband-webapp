module.exports = {
  create: function(req, res) {
    var showgoerParams = req.body;
    ShowgoerService.create(showgoerParams).then(res.created, function(ranson) {
      res.badRequest(ranson.message);
    });
  },

  summary: function(req, res) {
    Showgoer.count().exec(function(err, count) {
      if (err) return res.serverError(err);
      res.ok({total: count});
    });
  },

  index: function(req, res) {
    Showgoer.find().exec(function(err, showgoers) {
      if (err) return res.badRequest(err);
      res.ok(showgoers);
    });
  }
};
