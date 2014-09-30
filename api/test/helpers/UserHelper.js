module.exports = {
  createAnonymous: function() {
    return User.create({
      email: "addadmin@flashband.com",
      mobpassword: "222222",
      webpassword: "333333"
    });
  }
};
