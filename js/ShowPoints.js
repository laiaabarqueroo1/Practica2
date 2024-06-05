document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the logged-in user from localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        console.error('No user is currently logged in.');
        return;
    }

    // Retrieve all users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the current logged-in user
    const currentUser = users.find(user => user.username === loggedInUser);
    if (!currentUser) {
        console.error('Logged-in user not found:', loggedInUser);
        return;
    }

    // Update the user's score and level in the DOM
    const scoreElement = document.querySelector('.user-points .score');
    scoreElement.textContent = currentUser.totalScore ? currentUser.totalScore + ' points' : '0 points';

    const levelElement = document.querySelector('.user-level .points-level');
    levelElement.textContent = currentUser.level;

    // Load the menu and add event listeners
    const menuContainer = document.getElementById("menu-container");
    fetch("menu.html")
        .then(response => response.text())
        .then(data => {
            menuContainer.innerHTML = data;
            loadMenu.addMenuEventListeners(); 
        })
        .catch(error => console.error("Error loading menu:", error));     
});
