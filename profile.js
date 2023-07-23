const apiUrl = 'https://jsonplaceholder.typicode.com/users';
let currentUser = {};

// Function to display the user profile
function displayUserProfile(user) {
    const nameElement = document.getElementById('name');
    const usernameElement = document.getElementById('username');
    const emailElement = document.getElementById('email');
    const websiteElement = document.getElementById('website');
  
    nameElement.textContent = currentUser.name;
    usernameElement.textContent = `@${currentUser.username}`;
    emailElement.textContent = `email: ${currentUser.email}`;
    websiteElement.textContent = `website: ${currentUser.website}`;

    // Display the user's posts on the homepage
  //displayPostsOnHomePage(posts);
  }

// Function to display user-specific posts
 async function displayPosts() {
    const userPostsResponse = await fetch(`${apiUrl}/${currentUser.id}/posts`);
    const userPosts = await userPostsResponse.json();
  
    const myPostsList = document.getElementById('myPosts');
    myPostsList.innerHTML = '';
  
    if (Array.isArray(userPosts) && userPosts.length > 0) {
      userPosts.forEach((post) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post'); // Add a class to the post container for styling

        postDiv.innerHTML = `
          <p>${post.body}</p>
        
          <div class="post-actions">
          <button class="like-button"><i class="far fa-heart"></i> Like</button>
          <button class="comment-button"><i class="far fa-comment"></i> Comment</button>
        </div>
        <div class="comments"></div>
        <hr>
        `;
        myPostsList.appendChild(postDiv);
      });
    } else {
      console.error('No posts found for the current user.');
    }
  }

  
// Function to handle posts
async function createPost(content) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser.id,
          body: content,
        }),
      });
  
      if (response.ok) {
        const newPost = await response.json(); // Parse the response to get the newly created post
        alert('Post created successfully!');
        displayPosts(); // Refresh the list of posts after creating a new post
        return newPost; // Return the new post data
      } else {
        console.error('Failed to create post:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  


  // Check if the user is already logged in on page load
    document.addEventListener('DOMContentLoaded', () => {

  // Retrieve the user data from local storage
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));

  // Check if the user is authenticated
  if (storedUser) {
    currentUser = storedUser;
    displayUserProfile(currentUser);
    displayPosts();
    //showHomePage();
    // If the user is authenticated, display the user profile information using displayUserProfile function from profile.js
    
  } else {
    // If the user is not authenticated, you can redirect them to the login page or display an error message
    
    alert("Please login to view your profile.");
  }
});