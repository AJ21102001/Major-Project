const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}).then((posts)=> {
    //     return res.render('home', {
    //         title: "Major Project | Home",
    //         posts: posts
    //     });
    // });

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .then((posts) => {
        User.find({}).then((users) => {
            return res.render('home', {
                title: "Major Project | Home",
                posts: posts,
                all_users: users
            });
        })
    });
}