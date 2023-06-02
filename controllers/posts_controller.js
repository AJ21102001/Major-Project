const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then((user) => {
        return res.redirect('back');
    }).catch((err) => {console.log("Error in Creating a Post"); return;});
}

module.exports.destroy = function(req, res) {
    Post.findById(req.params.id).then((post) => {
        if(post.user == req.user.id){
            Post.deleteOne({_id: req.params.id}).catch((error) => {
                console.log("Error in Deleting Post in Destroy");
            });
            Comment.deleteMany({post: req.params.id}).catch((err) => {
                console.log("Error in Deleting Comment in Destroy");
                return;
            });
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    });
}



