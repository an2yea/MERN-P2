const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.createPost = async function(req,res)
{
    // console.log(req.user);
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id 
        })
        return res.redirect('back');
    }catch(err){
        console.log("error ", err);
        return;
    }
   
}

module.exports.deletePost = async function(req,res)
{
    try{
        let post = await Post.findByIdAndDelete(req.params.id)
        
        if(post.user != req.user.id){
            post.remove();

            let comment = await Comment.deleteMany({post:req.post.id})
            return res.redirect('back');
        }
    } catch (err) {
        console.log("Error", err);
        return ("back");        
    }
}