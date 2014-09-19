var prepareArgs = function(tag, serial, blockedAt) {
  var newTag = tag ? tag : ''.concat((new Date()).getTime());
  var newSerial = serial ? serial : 1;
  return {tag: newTag, serial: newSerial, blockedAt: blockedAt};
};

module.exports = {
  createBlocked: function(tag, serial) {
    var args = prepareArgs(tag, serial, new Date());
    return Flashband.create(args);
  },

  createSuccess: function(tag, serial) {
    var args = prepareArgs(tag, serial, null);
    return Flashband.create(args);
  }
};
