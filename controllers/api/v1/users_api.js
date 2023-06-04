const User = require('../../../models/user');
const JWT = require('jsonwebtoken');

//Action for SignIn (Create Sessions)
module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: 'Invalid Username/Password',
            });
        }else{
            return res.json(200, {
                message: 'Sign In Successfull',
                data: {
                    token : JWT.sign(user.toJSON(), 'codeial', {expiresIn: '100000'})
                }
            });
        }


    }catch(err){
        return res.json(500, {
            message: 'Internal Server Error',
        });
    }
}