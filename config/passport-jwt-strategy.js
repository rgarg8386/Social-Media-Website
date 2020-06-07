const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "codieal"
}

passport.use(new JWTstrategy(opts, (jwtPayLoad, done) => {
    User.findById(jwtPayLoad._id, (err, user) => {
        if (err) {
            console.log("Error in findeing user from JWT");
            return;
        }
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    });
}));
exports = passport;