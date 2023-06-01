const Post = require('../models/post');
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}).then((posts)=> {
    //     return res.render('home', {
    //         title: "Major Project | Home",
    //         posts: posts
    //     });
    // });

    Post.find({}).populate('user').then((posts) => {
        return res.render('home', {
            title: "Major Project | Home",
            posts: posts
        });
    });
}