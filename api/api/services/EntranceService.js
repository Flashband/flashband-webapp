var Q = require('q');

module.exports = {
  register: function(flashbandUid, callback) {
    var args = { flashband: flashbandUid };
    Q(FlashbandService.exists(args)).then(function(flashbandExists) {
      if (flashbandExists) {
        Q(Entrance.count(args)).then(function(count) {
          if (count) {
            callback({message: 'duplicated entrance'}, null);
          } else {
            Q(Entrance.create(args)).then(function(newEntrance) {
              callback(err, entrance);
            });
          }
        });
      } else {
        callback({message: 'flashband does not exists'}, null);
      }
    });
  }
};
