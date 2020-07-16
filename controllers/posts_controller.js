const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
module.exports.create = async function(req, res) {
    try {
        let pos = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        id = pos._id;
        let post = await Post.findById(id)
            .populate('user')
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created"
            });
        }
        req.flash('success', 'Post Published!');
        return res.redirect("back");
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

/*module.exports.destroy = function(req, res) {
    Post.findById(req.params.id, (err, post) => {
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();
            Comment.deleteMany({ post: req.params.id }, function(err) {
                return res.redirect('back');
            });
        } else {
            return res.redirect('back');
        }
    });
}*/
module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();
            await Like.deleteMany({ likeable: post, onModel: 'Post' });
            await Like.deleteMany({ _id: { $in: post.comments } });
            await Comment.deleteMany({ post: req.params.id });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated Comments deleted');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}