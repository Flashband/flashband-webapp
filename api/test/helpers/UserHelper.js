module.exports = {
  createAnonymous: function() {
    return User.create({
      email: "admin@flashband.com",
      mobpassword: "123123",
      webpassword: "124124"
    });
  }
};
