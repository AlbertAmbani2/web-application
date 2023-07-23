const apiUrl = 'https://jsonplaceholder.typicode.com/users'; // We'll use the users endpoint as a mock database for user registration.
let currentUser = null;

// Function to handle user registration
async function registerUser(event) {
  event.preventDefault();

  const regUsername = document.getElementById('regUsername').value;
  const regPassword = document.getElementById('regPassword').value;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: regUsername,
        password: regPassword,
      }),
    });

    if (response.ok) {
      // User registration successful
      document.getElementById('registrationFormContainer').style.display = 'none';
      document.getElementById('loginFormContainer').style.display = 'block';
    } else {
      console.error('Failed to register user:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error registering user:', error);
  }
}

// Function to handle user login
async function loginUser(event) {
  event.preventDefault();

  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(apiUrl + `?username=${username}&password=${password}`);
    const matchedUsers = await response.json();

    if (matchedUsers.length > 0) {
      // User login successful
      currentUser = matchedUsers[0];
      alert(`Welcome, ${currentUser.username}!`);

      // Save user data to localStorage
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      // Retrieve the user's posts from the API
      const userPostsResponse = await fetch(`${apiUrl}/${currentUser.id}/posts`);
      const userPosts = await userPostsResponse.json();

      //displayUserProfile(currentUser, userPosts)
      showHomePage();
      
    } else {
      alert('Invalid username or password. Please try again.');
    }
  } catch (error) {
    console.error('Error logging in user:', error);
  }
}
 //display user posts
 function displayPostsOnHomePage(posts) {
  const feedPostsDiv = document.getElementById('feedPosts');

  if (Array.isArray(posts) && posts.length > 0) {
    feedPostsDiv.innerHTML = '';

    posts.forEach((post) => {
      const postDiv = document.createElement('div');
      postDiv.innerHTML = `
        <p>${post.body}</p>
        <hr>
      `;
      feedPostsDiv.appendChild(postDiv);
    });
  } else {
    
    feedPostsDiv.innerHTML = '<p>No posts to display.</p>';
  }
}

// Check if the user is already logged in on page load
document.addEventListener('DOMContentLoaded', async () => {
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));

  if (storedUser) {

    try {
    // If the user is authenticated, set the authenticatedUser variable and show the home page
    currentUser = storedUser;

    //displayUserProfile(currentUser);
    displayPostsOnHomePage();
    showHomePage();
 // displayUserProfile(currentUser, userPosts);
  } catch (error) {
    console.error('Error loading user data:', error);
  } 
}
  else  {
    showRegistrationForm(); // Show reg form by default if the user is not logged in
  }
});


// Function to display the registration form and hide other forms
function showRegistrationForm() {
  document.getElementById('registrationFormContainer').style.display = 'block';
  document.getElementById('loginFormContainer').style.display = 'none';
  document.getElementById('app').style.display = 'none';
  document.getElementById('profileBox').style.display = 'none';
}

// Function to display the login form and hide other forms
function showLoginForm() {
  document.getElementById('registrationFormContainer').style.display = 'none';
  document.getElementById('loginFormContainer').style.display = 'block';
  document.getElementById('app').style.display = 'none';
  document.getElementById('profileBox').style.display = 'none';
}

// Function to handle navigation when "Profile" link is clicked
function navigateToProfile(event) {
  event.preventDefault(); // Prevent the default link behavior

  // Implement your navigation logic here
  // For example, you can use the "window.location.href" to navigate to the profile page:
  window.location.href = "/profile.html";
}

// Add event listener to the "Profile" link
const profileLink = document.querySelector(".sidebar .nav-links a[href='/profile.html']");
profileLink.addEventListener("click", navigateToProfile);

// Function to display the app content and hide other forms
function showHomePage() {
  document.getElementById('registrationFormContainer').style.display = 'none';
  document.getElementById('loginFormContainer').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('profileBox').style.display = 'block';
}


// Function to handle user logout
function logoutUser() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  showLoginForm();
}

// Event listener for user logout
document.getElementById('sidebarcontent').addEventListener('click', (event) => {
  if (event.target.id === 'logoutBtn') {
    logoutUser();
  }
});

// Event listeners for user registration and login
document.getElementById('registrationFormContainer').addEventListener('submit', registerUser);
document.getElementById('loginFormContainer').addEventListener('submit', loginUser);

// Add the event listener for the profile icon
document.getElementById('profileIcon').addEventListener('click', () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('sidebar-minimized');
});



