const User = require('../models/user.js')

module.exports.profile = function(req,res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signUp = function(req,res)
{
    return res.render('sign_up');
}

module.exports.signIn = function(req,res)
{
    return res.render('sign_in');
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
    console.log(req.body);
    User.findOne({email: req.body.email}, function(err,user){
        if(err)
        {
            console.log(`Error logging In at the moment, please try again ${err}`);
            return;
        }
        if(!user)
        {
            console.log("User does not exist, please sign up first or check your email and password");
            return res.redirect('/');
        }else{
            if(user.password == req.body.password){
                console.log("Sign In approved, Welcome");
                console.log(user);
                res.cookie('user_id', user.id);
                console.log(res.cookie.user_id);
                return res.redirect('/users/profile');
            } else{
                console.log("Incorrect password", err);
                return res.redirect('back');
            }
        }
    });   
}

module.exports.profile = function(req,res)
{
    console.log(req.cookies);
    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id, function(err,user){
            if(err){
                console.log("Could not fetch/match cookies");
                return;   
            }
            else res.render('user_profile',{
                title: "Profile Page",
                user: user
            })
        })
    } else {
        res.redirect('users/sign_up')
    }
}