const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index= async function(req,res){

   let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

     return res.json(200,{
        message : "List of Posts",
        posts : posts
     });
}

module.exports.destroy = async function(req, res) {
    
   try{
       let post = await Post.findById(req.params.id);
       
       if(post.user == req.user.id){
           await Post.deleteOne({_id: req.params.id});
           await Comment.deleteMany({post: req.params.id});

           return res.json(200,{
            message : "Post Deleted",
           });
       }else{
         return res.json(401, {
            message: "You Cannot Delete the Post",
         });
       }
   
   }catch(err){
       return res.json(500, {
         message: 'Internal Server Error',
       });
   }

} 