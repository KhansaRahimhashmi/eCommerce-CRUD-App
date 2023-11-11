async function fetchAndDisplayPosts() {
    try {
        let data = await fetch('https://jsonplaceholder.typicode.com/posts');
        let response = await data.json();
        response.forEach(post => displayPost(post));
    } catch (err) {
        console.log(err);
    }
}
function displayPost(post) {
    let postsContainer = document.querySelector('.posts');
    let postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
        <div class="post-buttons">
            <button data-postId="${post.id}" class="delete-post">Delete</button>
            <button data-postId="${post.id}" class="update-post">Update</button>
        </div>
    `;
    postsContainer.appendChild(postElement);
}
async function deletePost(postId) {
    try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE',
        });
        let postElement = document.querySelector(`[data-postId="${postId}"]`);
        if (postElement) {
            postElement.remove();
            console.log(`Post with ID ${postId} deleted successfully.`);
        } else {
            console.log(`Post element with ID ${postId} not found in the UI.`);
        }
    } catch (err) {
        console.error(`Error deleting post with ID ${postId}:`, err);
    }
}


document.querySelector('.posts').addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-post')) {
        const postIdToDelete = event.target.dataset.postid;
        deletePost(postIdToDelete);
    }
});

fetchAndDisplayPosts();
