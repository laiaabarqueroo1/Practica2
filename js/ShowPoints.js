document.addEventListener('DOMContentLoaded', function () {
    var users = JSON.parse(localStorage.getItem('users')) || {};
    for (var userName in users) {     
        var userScore = users[userName].totalScore;
        var userLevel = users[userName].level;      
        var scoreElement = document.querySelector('.user-points .score');
        scoreElement.textContent = userScore + ' points';    
        var levelElement = document.querySelector('.user-level .level');
        levelElement.textContent = userLevel;
    }
    var menuContainer = document.getElementById("menu-container");
    fetch("menu.html")
    .then(response => response.text())
    .then(data => {
        menuContainer.innerHTML = data;
        loadMenu.addMenuEventListeners(); 
    })
    .catch(error => console.error("Error loading menu:", error));     
});