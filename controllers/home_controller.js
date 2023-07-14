const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
     
     try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            // populate: {
            //     path: 'likes'
            // }
        }).populate('likes');

        console.log(posts.comments)
        
        let users = await User.find({});
        console.log(users);
    
        return res.render('home', {
            title: "Major Project | Home",
            posts: posts,
            all_users: users
        });

     }catch(err){
        console.log('Error', err);
        return;
     }
     
}