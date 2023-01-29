const User = require('../models/user.js')

module.exports.profile = function(req,res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signUp = function(req,res)
{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_up',{
        title: "Sign Up page"
    });
}

module.exports.signIn = function(req,res)
{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_in',{
        title: "Sign In page"
    });
}

module.exports.createUser = function(req,res)
{
    if(req.body.password != req.body.confirmPassword){
        console.log("The two passwords do not match, please try again");
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err)
        {
            console.log("Error comparing database, please try again", err);
            return res.redirect('back');
        }
        if(!user)
        {
            User.create(req.body, function(err,user){
                if(err){
                    console.log("Error creating account",err);
                    return;
                }
                console.log("Account creation successful");
                return res.redirect('/users/sign_in');
            })   
        }else{
            console.log("Email already exists, please log into your account");
            return res.redirect('/users/sign_in');
        }
    })
}


module.exports.logIn = function(req,res)
{
   return res.redirect('/');
}


module.exports.destroySession = function(req,res,next)
{
    req.logout(function(err){
        if(err) return next(err);
        return res.redirect('/');
    });
}
