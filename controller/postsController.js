const Post = require("../models/post");

module.exports.createPost = function(req,res)
{
    console.log(req.user);
    Post.create({
        content: req.body.content,
        user: req.user._id 
    }, function(err,post){
        if(err){
            console.log("Error in post creation",err);
            return;
        }
        console.log(post);
        return res.redirect('back');
    })   
}