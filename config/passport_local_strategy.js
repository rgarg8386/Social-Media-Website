const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//authentication using passport
const User = require('../models/user');
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },

    function(req, email, password, done) {
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                req.flash('error', "err");
                return done(err);
            }
            if (!user || user.password != password) {
                req.flash('success', 'Invaid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    return done(null, user._id);
});


//deserializing the user from the key in the cookies
passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);
    });
});
//check if the user  authentication
passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    //user is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains the signed user from the session cookieand we are just sending this to the locals for views
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;