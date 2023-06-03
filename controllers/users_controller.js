const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function(req, res){

    try{
        let user = await User.findById(req.params.id);

        return res.render('usersProfile', {
            title: 'Ankit',
            profile_user: user
        });

    }catch(err){
        console.log('Error', err);
        return;
    }

}

module.exports.update = async function(req,res){
    
    try{
        if(req.user.id == req.params.id){
            let user = await User.findById(req.params.id);
            
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('***Multer Error', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..' , user.avatar));
                    }
                    //Saving the path Of uploaded File into the Avatar Field in DB
                    user.avatar = User.avatarPath + '/' + req.file.filename; 
                }
                user.save();
                return res.redirect('back');
            });
        }else{
            return res.status(401).send('Unauthorized');
        }

    }catch(err){
        console.log('Error', err);
        return;
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
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    try{
        let user = await User.findOne({email: req.body.email},);
        
        if(!user){
             let user = User.create(req.body);
             return res.redirect('/users/sign-in');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log('Error', err);
        return;
    }
}

//Action for SignIn (Create Sessions)
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function (err) {
        if (err) return next(err);
        req.flash('success', 'You have Logged Out Successfully');
        return res.redirect("/");
    });
}