var Q = require('q');

module.exports = {
  exists: function(flashbandUid) {
    return Q(Flashband.count({ tag: flashbandUid })).then(function(count) {
      return count > 0;
    });
  }
};
