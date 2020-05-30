//exports function use krke apa ehnu kisi vi file ch use kr sakde as aa object 
const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = function(req, res) {
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function(err, posts) {
            User.find({}, (err, user) => {
                return res.render('home', {
                    title: "Codieal | Home",
                    posts: posts,
                    all_users: user
                });
            });
        });
}