var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

passport.use('bearer', new BearerStrategy(function(accessToken, done) {
  Token.findOne({token: accessToken}, function(err, token) {
    var fail = {allowed: false};

    if (err)    return done(err, fail);
    if (!token) return done(new Error('Token not found'), fail);

    done(null, {allowed: true});
  });
}));
