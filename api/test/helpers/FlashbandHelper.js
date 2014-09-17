module.exports = {
  createBlocked: function() {
    var d = new Date();
    var randonTag = ''.concat(d.getTime());
    var args = {tag: randonTag, serial: 1, blockedAt: new Date()};

    return Flashband.create(args);
  },

  createSuccess: function() {
    var d = new Date();
    var randonTag = ''.concat(d.getTime());
    var args = {tag: randonTag, serial: 1, blockedAt: null};

    return Flashband.create(args);
  }
};
