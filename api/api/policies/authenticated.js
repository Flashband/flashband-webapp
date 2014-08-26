/**
 * Allow any authenticated user.
 */
var passport = require('passport');

module.exports = function (req, res, done) {
  passport.authenticate('bearer', {session: false}, function(err, success) {
    if (err)     return done(err);
    if (success.allowed) return done();

    return res.send(403, {message: "You are not permitted to perform this action."});
  })(req, res);
};
