
const editForm = document.getElementById('edit-form');

editForm.addEventListener('submit', function(event) {event.preventDefault();

  // Get the postId from localStorage
  const postId = localStorage.getItem('postId');

  // Getform values
  const title = document.getElementById('title').value;
  const albumId = document.getElementById('albumId').value;

  // Check fields are empty
  if (title.trim() === '' || albumId.trim() === '') {
    return;
  }

  // Create the request body
  const requestBody = {
    title: title,
    albumId: albumId
  };

  // Send the request to edit the photo using the API
  fetch(`https://jsonplaceholder.typicode.com/photos/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (response.ok) {
        console.log('Photo edited successfully');
        // Update the title in the card
        const titleElement = document.getElementById(`title-${postId}`);
        if (titleElement !== null) {
          titleElement.textContent = title;
        }

        localStorage.removeItem('postId');
        window.history.back();
      } else {
        console.error('Error editing photo');
      }
    })
    .catch(error => {
      console.error('Error editing photo:', error);
    });
}); 