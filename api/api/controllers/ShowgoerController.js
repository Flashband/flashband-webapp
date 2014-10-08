module.exports = {
  create: function(req, res) {
    var showgoerParams = req.body;
    ShowgoerService.create(showgoerParams).then(res.created, function(ranson) {
      res.badRequest(ranson.message);
    });
  },

  summary: function(req, res) {
    ShowgoerService.summary().then(res.ok).fail(res.badRequest);
  },

  index: function index (req, res) {
    var args;

    if (req.query.s) {
      args = {
        name: {
          'contains': req.query.s
        }
      };
    }

    ShowgoerService.search(args).then(res.ok).fail(res.badRequest);
  },

  associate: function(req, res) {
    var showGoerId = req.param('showgoerId');
    var flashBandTag = req.param('tag');

    ShowgoerService.associate(showGoerId, flashBandTag).then(res.ok, function(ranson) {
      res.badRequest(ranson.message);
    });
  }
};
