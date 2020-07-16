const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require("../models/like");
const commentsMailer = require('../mailers/comments-mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_workers');
module.exports.create = async function(req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user', 'name email').execPopulate();
            //commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save((err) => {
                if (err) {
                    console.log("error in creating a queue");
                }
                console.log(job.id);
            });
            console.log(req.xhr);
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created"
                });
            }
            res.redirect("/");
        }
    } catch (err) {
        console.log("ERROR", err);
    }
}
module.exports.destroy = async function(req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        console.log(comment.user, req.user.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            await Like.deleteMany({ likeable: comment._id, onModel: 'Comment' });
            comment.remove();
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            console.log(req.xhr);
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "comment deleted"
                });
            }
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log("ERROR", err);
    }
}