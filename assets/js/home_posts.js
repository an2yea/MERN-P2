{
    console.log("Working");
    let createPost = function (){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post', 
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    console.log("NewPost creatred");
                    $('post-list-container>ul').prepend(newPost);
                },error:function(error){
                    console.log(error.responseText);
                }
            });   
        })
    }   

    let newPostDom = function(post){
        return $(`
            <li id="post-${post._id}">
                <p>
                        <small><a class="delete-post" href="/posts/delete_post/${post._id}"">Delete </small></a>
                        ${post.content}
                    <br>
                    <small>
                        ${post.user.name}
                    </small>
                </p>
                <div class="post-comments">
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Type Here to add comment..." required>
                            <input type="hidden" name="post" value="${post._id}" >
                            <button> Post Comment </button>
                        </form>

                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                
                        </ul>
                    </div>
                </div>
                
            </li>
            `)
    }
    createPost();
}