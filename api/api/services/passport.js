var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

passport.use('bearer', new BearerStrategy(function(accessToken, done) {
  Token.findOne({token: accessToken}, function(err, token) {
    success = {allowed: false};

    if (err)    return done(err, success);
    if (!token) return done(new Error('Token not found'), success);

    success.allowed = true;
    done(null, success);
  });
}));
