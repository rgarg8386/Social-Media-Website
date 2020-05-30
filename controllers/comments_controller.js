const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = function(req, res) {
    Post.findById(req.body.post, function(err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment) {
                console.log(comment);
                post.comments.push(comment);
                post.save();
                console.log(post.comments);
                res.redirect("/");
            });
        }
    });
}
module.exports.destroy = function(req, res) {
    console.log(req.user);
    Comment.findById(req.params.id, (err, comment) => {
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function(err, post) {
                return resredirect('back');
            });
        } else {
            return res.redirect('back');
        }
    });
}