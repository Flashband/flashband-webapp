module.exports = {
  create: function(req, res) {
    var showgoer = req.body;
    //var name = req.params['name'];
    //var doctype = req.params['doctype'];
    //var docnumber = req.params['docnumber'];
    //console.log(name);
    //console.log(doctype);
    //console.log(docnumber);
    console.log(showgoer);
    if (showgoer.name === 'Fulano de Tal') 
      res.created();
    else 
      res.badRequest();
  }
};
