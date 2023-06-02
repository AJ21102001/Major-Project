const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id).then((user)=>{
        return res.render('usersProfile', {
            title: 'Ankit',
            profile_user: user
        });
    });    
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body).then((user)=>{
            return res.redirect('back');
        }).catch((err)=>{
            console.log("Cannot Update the User");
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

//Render Sign Up
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    } 
    return res.render('user_sign_up', {
        title: 'Sign Up'
    });
}

//Render Sign Up
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'Sign In'
    });
}

//Action for SignUp
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    
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
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
    });
}