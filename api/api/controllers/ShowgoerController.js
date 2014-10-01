module.exports = {
  create: function(req, res) {
    var showgoer = req.body;
    if (showgoer.name === 'Fulano de Tal') 
      res.created();
    else 
      res.badRequest();
  }
};
