const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post).then((post) => {
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
            }).then((comment) => {
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            }).catch((err) => {
                console.log('Error in Adding Comment');
            });
        }
    }).catch((err) => {
        console.log('Error in Finding Post for Comment');
    });
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id).then((comment) => {
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.deleteOne({_id: req.params.id}).catch((error) => {
                console.log("Error in Deleting Comment in Destroy");
            }); 
            Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}}).then((post) => {
                res.redirect('back');
            }).catch((error) => {
                console.log("Error in Deleting Comment in from Post Datbase");
            });
        }else{
            return res.redirect('back');
        }
    })
}