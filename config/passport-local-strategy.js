const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


//Authentication Using Passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email, password, done){
    //find a User and establish identity
    User.findOne({email: email}).then((user) => {
        if(!user || user.password != password){
            console.log('Invalid Username or Password');
            return done(null, false);
        }
        return done(null, user);
    }).catch((err) => {
        console.log("Error in Finding User --> Passport");
        return done(err);
    });
}
));

//Serialize
passport.serializeUser(function(user,done){
    done(null, user.id);
});

//DeSerialize
passport.deserializeUser(function(id,done){
    User.findById(id).then((user) => {
        return done(null, user);
    }).catch((err) => {
        console.log("Error in Finding User --> Passport");
        return done(err);
    });
});


//Check if User is Authenticated
passport.checkAuthentication = function(req, res, next){
    //If user is Signed in, then pass onthe request to the next function(controller'action)
    if(req.isAuthenticated()){
        return next();
    }
    //If not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //Req.user contains the current signed in user from session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;