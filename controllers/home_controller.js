//exports function use krke apa ehnu kisi vi file ch use kr sakde as aa object 
const Post = require('../models/post');
const User = require('../models/user');

/*module.exports.home = function(req, res) {
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
    }*/
//Or using async await
module.exports.home = async function(req, res) {
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    let user = await User.find({}, (err, user) => {
        return res.render('home', {
            title: "Codieal | Home",
            posts: posts,
            all_users: user
        });
    });
}

//or
/*
    module.exports.home = async function(req, res) {
        try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })

        let user = await User.find({}, (err, user) => {
            return res.render('home', {
                title: "Codieal | Home",
                posts: posts,
                all_users: user
            });
        });
    } catch (err) {
        console.log('Error', err);
    }
}*/