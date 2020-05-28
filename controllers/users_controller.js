const User = require('../models/user');

//exports function use krke apa ehnu kisi vi file ch use kr sakde as aa object 

module.exports.profile = function(req, res) {
        if (req.cookies.user_id) {
            User.findById(req.cookies.user_id, function(err, user) {
                if (user) {
                    return res.render('users_profile', {
                        title: "Profile",
                        user: user
                    });
                }
                return res.redirect('users/sign-in');
            });
        } else {
            return res.redirect('users/sign-in');
        }
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
                console.log(user);
                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });
}
module.exports.createSession = (req, res) => {
    //steps to authenticate
    //find the user
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log("error in creating user while signing up");
            return;
        }
        //handle user not found
        if (user) {
            //handle password dont match
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            //handle session creation

            res.cookie('user_id', user._id);
            return res.redirect('/users/profile');
        } else {
            //handle user not found
            return res.redirect('back');
        }
    });
}