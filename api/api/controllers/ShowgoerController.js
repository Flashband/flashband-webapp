module.exports = {
  create: function(req, res) {
    var showgoerParams = req.body;
    ShowgoerService.create(showgoerParams).then(res.created, res.badRequest);
  }
};
