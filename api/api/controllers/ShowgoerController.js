module.exports = {
  create: function create (req, res) {
    var showgoerParams = req.body;
    ShowgoerService.create(showgoerParams).then(res.created, function(ranson) {
      res.badRequest(ranson.message);
    });
  },

  summary: function summary (req, res) {
    Showgoer.count().exec(function(err, count) {
      if (err) return res.serverError(err);
      res.ok({total: count});
    });
  }
};
