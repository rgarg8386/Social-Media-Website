{
    let createPost = function() {
            let newPostForm = $('#new-post-form');
            newPostForm.submit(function(e) {
                e.preventDefault();
                $.ajax({
                    type: 'post',
                    url: '/posts/create',
                    data: newPostForm.serialize(),
                    success: function(data) {
                        console.log(data);
                        let newPost = newPostDom(data.data.post);
                        $('#post-list-container>ul').prepend(newPost);
                        deletePost($(' .delete-post-button', newPost))
                    },
                    error: function(error) {
                        console.log(error.responseText);
                    }
                });
            })
        }
        //method to create a Post in DOM
    let newPostDom = function(post) {
            return $(`<li id="post-${post._id}">
            <p>
                <small>
                    <a class="delete-post-button" href="posts/destroy/${post._id}">x</a>
                </small>
                ${ post.content }
                <br>
                <small>
                    ${ post.user.name }
                </small>
            </p>
            <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add a comment..." required>
                    <input type="hidden" name="post" placeholder="Type Here..." value="${ post._id }">
                    <input type="submit" value="Add Comment">
                </form>    
                <div class="post-comments-list">
                    <ul id="post-comments-${ post._id }"></ul>
                </div>
            </div>
        </li>`)
        }
        //add a comment to delete a post from DoM
    let deletePost = function(deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();
            console.log(deleteLink, "qwdf");
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error) {
                    console.log(error, responseText);
                }
            })
        })
    }
    let delete_post = $(' .delete-post-button')
    for (let i = 0; i < delete_post.length; i++) {
        deletePost(delete_post[i]);
    }
    createPost();
}

{
    let createComment = function() {
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data) {
                    let newcomment = newCommentDom(data.data.comment);
                    $('.post-comments-list>ul').prepend(newcomment);
                    deleteComment($(' .delete-comment-button', newcomment));
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    let newCommentDom = function(comment) {
        return $(`<li id="comment-${comment._id}">
        <p>
                <small>
                    <a class="delete-comment-button" href="comments/destroy/${comment._id}">D</a>
                </small>
                    ${comment.content}
                        <br>
                        <small>
                    ${comment.user.name}
                </small>
        </p>
    </li>`);
    }
    let deleteComment = function(deleteLink) {
        console.log(deleteLink);
        $(deleteLink).click(function(e) {
            e.preventDefault();
            console.log(deleteLink, "rahul");
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#comment-${data.data.comment_id}`).remove();
                },
                error: function(error) {
                    console.log(error, responseText);
                }
            });
        });
    }
    createComment();
}