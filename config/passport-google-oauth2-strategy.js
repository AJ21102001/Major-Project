const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//Tell Passport to use a new strategy to log in
passport.use(new googleStrategy({
    clientID: "408259172840-i3k4rv5th6sd2j0p65hmvr1kbmg7bnce.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},

function(accessToken, refreshToken, profile, done){
    //Find a User
    User.findOne({email: profile.emails[0].value}).then((user) => {

        console.log(profile);
        if(user){
            //If found, set this user as req.user
            return done(null, user);
        }else{
            //If not Found, create the user and it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),
            }).then((user) => {
                return done(null, user);
            }).catch((error) => {
                console.log('Error in creting user in Google Strategy' + error);
                return;
            });
        }

    }).catch((error) => {
        console.log('Error in Google Strategy' + error);
        return;
    });
}

)); 

module.exports = passport;