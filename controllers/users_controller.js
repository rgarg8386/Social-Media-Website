const User = require('../models/user');

//exports function use krke apa ehnu kisi vi file ch use kr sakde as aa object 

module.exports.profile = function(req, res) {
        return res.render('users_profile', {
            title: "Profile"
        });
    }
    //module is optional
exports.posts = function(req, res) {
    return res.render('users_posts', {
        title: "Posts"
    });
}
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: "Sign Up"
    });

}
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: "Sign In"
    });
}
module.exports.create = (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect("back");
    }
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log("error in finding user in signing up");
            return;
        }
        if (!user) {
            User.create(req.body, (err, user) => {
                if (err) {
                    console.log("error in creating user while signing up");
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });
}
module.exports.createSessions = (req, res) => {

}