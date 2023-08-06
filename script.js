const postList = document.getElementById('post-list');

// Fetch data from the API
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        // Loop through the posts array and create a card for each post
        posts.forEach(post => {
            // Fetch the corresponding image for each post
            fetch(`https://jsonplaceholder.typicode.com/photos/${post.id}`)
                .then(response => response.json())
                .then(image => {

                    // create the innerHTML
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.id = `post-${post.id}`;

                    const img = document.createElement('img');
                    img.src = image.url;
                    img.alt = image.title;
                    card.appendChild(img);

                    const title = document.createElement('h2');
                    title.textContent = post.title;
                    card.appendChild(title);

                    const body = document.createElement('p');
                    body.textContent = post.body;
                    card.appendChild(body);

                    const id = document.createElement('h4');
                    id.textContent = "The ID of this image is : " + post.id;
                    card.appendChild(id);


                    // delete button
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => {
                        deletePost(post.id);
                    });
                    card.appendChild(deleteButton);

                    // edit button
                    // edit button
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', () => {
                        navigateToEditPage(post.id);
                    });
                    card.appendChild(editButton);

                    postList.appendChild(card);
                })
                .catch(error => {
                    console.error('Error fetching:', error);
                });
        });
    })
    .catch(error => {
        console.error('Error fetching :', error);
    });

function deletePost(postId) {
    // Show a confirmation message to the user
    const confirmed = confirm("Are you sure you want to delete this post?");

    if (confirmed) {
        // Perform the delete operation using the API
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Post deleted successfully');
                    // Remove the post card from the UI
                    const postElement = document.getElementById(`post-${postId}`);
                    if (postElement) {
                        postElement.remove();
                    }
                } else {
                    console.error('Error deleting post');
                }
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    }
}

function navigateToEditPage(postId) {
    // Save the postId in localStorage to access it on the edit page
    localStorage.setItem('postId', postId);
    // Navigate to the edit page
    window.location.href = 'edit.html';
  }

