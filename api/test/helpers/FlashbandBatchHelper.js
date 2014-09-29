module.exports = {
  createActive: function(name) {
    return FlashbandBatch.create({name: name, active: true});
  }
};
