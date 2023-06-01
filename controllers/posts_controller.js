const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then((user) => {
        return res.redirect('back');
    }).catch((err) => {console.log("Error in Creating a Post"); return;});
}