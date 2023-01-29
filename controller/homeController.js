const { populate } = require('../models/comment');
const Post = require('../models/post');

module.exports.home = function(req,res){
    // Post.find({}, function(err,posts)
    // {
    //     console.log(posts);
    //     return res.render('home',{
    //         title: "Home",
    //         posts: posts,
    //     })
    // })


    Post.find({}).populate('user').populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    }).exec(function(err,posts)
    {
        return res.render('home',{
            title: "Home",
            posts: posts,
        })
    })
}