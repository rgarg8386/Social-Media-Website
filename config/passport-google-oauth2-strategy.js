const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: "77013127825-6i5ja2u1e466ct9b716fpplgj9go0a04.apps.googleusercontent.com",
    clientSecret: "69zN22J7Y2GascOBtrHBz1z1",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
}, function(accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.emails[0].value }).exec(function(err, user) {
        if (err) {
            console.log("error in creating user google strategy-passport", err);
            return;
        }
        console.log(profile);
        if (user) {
            return done(null, user);
        } else {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, (err, user) => {
                if (err) {
                    console.log("error in creating user google strategy-passport", err);
                    return;
                }
                return done(null, user);
            });
        }
    });
}));
exports = passport;