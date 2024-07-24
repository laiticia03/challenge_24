d/*ocument.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
    }
});

// Function to log out the user
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// Function to handle errors
function handleError(error) {
    console.error('An error occurred:', error);
    alert('An error occurred. Please try again.');
}

// Attach logout function to a logout button if exists
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}*/