module.exports ={
  register: function(flashbandUid, callback) {
    var args = {flashband: flashbandUid};
    Entrance.count(args).exec(function(err, count) {
      if (count)
        callback({message: 'duplicated entrance'}, null);
      else
        Entrance.create(args, callback);
    });
  }
}
