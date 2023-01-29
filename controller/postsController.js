const Post = require("../models/post");
const Comment = require("../models/comment");

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

module.exports.deletePost = function(req,res)
{
    Post.findByIdAndDelete(req.params.id, function(err,post){
        if(post.user != req.user.id){
            post.remove();

            Comment.deleteMany({post:req.post.id}, function(err){
                return res.redirect('back');
            })
        } else{
            return res.redirect('back');
        }
    })
}