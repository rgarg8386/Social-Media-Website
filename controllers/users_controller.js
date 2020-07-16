const User = require('../models/user');
const fs = require('fs');
const path = require('path');
//exports function use krke apa ehnu kisi vi file ch use kr sakde as aa object 

module.exports.profile = function(req, res) {
    User.findById(req.params.id, (err, user) => {
        return res.render('users_profile', {
            title: "Profile",
            profile_user: user
        });
    });
}

module.exports.update = async function(req, res) {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err) {
                if (err) {
                    console.log("****Multer Error:", err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect("back");
            });
        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        return res.status(401).send('Unauthorized');
    }
}
module.exports.signUp = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Sign Up"
    });

}
module.exports.signIn = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
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
module.exports.createSession = (req, res) => {
    req.flash('success', 'Logged in Suceesfuly');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout();
    req.flash('success', 'Logged out Suceesfuly');
    return res.redirect('/');
}