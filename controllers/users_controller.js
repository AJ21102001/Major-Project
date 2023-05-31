const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('usersProfile', {
        title: 'Ankit'
    });
}

//Render Sign Up
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Sign Up'
    });
}

//Render Sign Up
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'Sign In'
    });
}

//Action for SignUp
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){ console.log("Error in SignUp"); return;}
    //     if(!user){
    //         User.create(req.body, function(err, user){
    //             if(err){ console.log("Error in Creating a SignUp"); return;}
    //             return res.redirect('/users/sign-in');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // })

    User.findOne({email: req.body.email},).then((user) => {
        if(!user){
            User.create(req.body).then((user) => {
                return res.redirect('/users/sign-in');
            }).catch((err) => {console.log("Error in Creating a SignUp"); return;});
        }else{
            return res.redirect('back');
        }
    }).catch((err) => {console.log("Error in Creating a SignUp"); return;});
}

//Action for SignIn (Create Sessions)
module.exports.createSession = function(req, res){
    //To Do Later
}