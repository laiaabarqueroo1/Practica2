let game;
let myCanvas;
let ctx;
let currentLevel;
let timeLeft = 180;
let timerInterval;
let userName = "";
let userLives = 3; 
let gameStatus = 0; // 0: pregame, 1: ingame
let menuContainer;

$(document).ready(function () {
    myCanvas = document.getElementById("canvas");
    ctx = myCanvas.getContext("2d");
    newGame();
   

    function newGame() {
        $('#principal, #lose-page, #win-page').hide();
        startGame();
        loadTopScores();
        function startGame() {        
            $('#button1').click(function () {
                startNewLevel(0);
            });
        
            $('#button2').click(function () {
                startNewLevel(1);
            });
        
            $('#button3').click(function () {
                startNewLevel(2);
            });
        }
    }    
});

function startNewLevel(level) {
    $('#initial-page').hide();
    $('#principal').show();
    currentLevel = level;
    gameStatus = 1;
    game = new Game(myCanvas, ctx, currentLevel);
    game.initialize(currentLevel);
    updateLevelDisplay(currentLevel);
    clearInterval(timerInterval);
    startTimer();
    animation();
    menuContainer = document.getElementById("menu-container");
    fetch("menu.html")
    .then(response => response.text())
    .then(data => {
        menuContainer.innerHTML = data;
        loadMenu.addMenuEventListeners(); 
    })
    .catch(error => console.error("Error loading menu:", error));
    loadProducts();
}

function animation() {
    if (gameStatus === 1) {
        game.update();
        if (game.ball.out === true) {  
            cancelAnimationFrame(animation);
        } else {
            requestAnimationFrame(animation);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateTimerDisplay();
});

function mostrarPantalla(text) {
    gameStatus = 0;
    $('#canvas').hide();
    if (text === '.win-page') {
        $('#win-page').show();
    } else {
        $('#lose-page').show();
    }
 
    $('.buttonRestart').click(function () {
        gameStatus = 1;
        resetGame();
    });

    $('.buttonExit').click(function () {
        $('.end-page').hide();
        $('#principal').hide();
        $('#initial-page').show();
        resetGame();
        newGame(); 
    });
}
function resetGame() {
    $('#canvas').show();
    $('.end-page').hide();
    userLives = 3; 
    updateLivesDisplay();
    game.score = 0;
    updateScoreDisplay();
    game = new Game(myCanvas, ctx, currentLevel);
    game.initialize(currentLevel);
    game.reset();
    timeLeft = 180;
    clearInterval(timerInterval);
    updateTimerDisplay();
    startTimer();
    animation();
}

function updateLevelDisplay(currentLevel) {
    document.getElementById("level").textContent = currentLevel + 1;
}

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft === 0) {
            mostrarPantalla('.lose-page');
        }
    }, 1000);
}
function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    document.getElementById("timer").textContent = formattedTime;
}
function loseLife() {
    game.principalMusic('STOP'); // Stop the music
    if (userLives > 0) {
        userLives--;
        game.usedLives.push(userLives); 
        updateLivesDisplay();
        if (userLives > 0) {
            game.reset();
            clearInterval(timerInterval);
            animation(); 
            // LoseBall sound
            const audioLoseBall = new Audio('./sounds/LoseBall.wav');
            audioLoseBall.play();
        } else {
            clearInterval(timerInterval);
            mostrarPantalla('.lose-page');
            // LoseGame sound
            const audioLoseGame = new Audio('./sounds/LoseGame.wav');
            audioLoseGame.play();
        }
    }
}

function updateLivesDisplay() {
    const livesContainer = document.getElementById('lives');
    livesContainer.innerHTML = '';
    for (let i = 0; i < userLives; i++) {
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('flaticon-heart', 'life-icon');
        if (i < game.usedLives.length || i < userLives) {
            heartIcon.classList.add('full-heart');
        } 
        //heartIcon.classList.add('empty-heart');
        livesContainer.appendChild(heartIcon);
    }
}

function winGame() {
    // LoseGame sound
    const audioWinGame = new Audio('./sounds/WinGame.wav');
    audioWinGame.play();     

    clearInterval(timerInterval);
    document.getElementById("finalScore").textContent = game.score;
    saveScore(game.score); 
    mostrarPantalla('.win-page');
}

// Function to save the score
function saveScore(score) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (!loggedInUser) {
        console.error("No logged-in user found for saving the score.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = users.find(user => user.username === loggedInUser);

    if (currentUser) {
        // Initialize games array if it doesn't exist
        currentUser.games = currentUser.games || [];
        currentUser.games.push(score);
        currentUser.totalScore = currentUser.games.reduce((total, gameScore) => total + gameScore, 0);
        if (currentUser.totalScore >= 1000) {
            currentUser.level = "GOLD";
        } else if (currentUser.totalScore >= 350) {
            currentUser.level = "SILVER";
        } else {
            currentUser.level = "BRONZE";
        }
    } else {
        currentUser = {
            username: loggedInUser,
            games: [score],
            totalScore: score,
            level: score >= 1000 ? "GOLD" : score >= 350 ? "SILVER" : "BRONZE"
        };
        users.push(currentUser);
    }

    // Save changes to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Update top scores
    updateTopScores(loggedInUser, score);

    // Load and display top scores
    loadTopScores();
}

// Function to update top scores in localStorage
function updateTopScores(name, score) {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ name, score });

    // Sort scores in descending order and keep only the top 5
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5);

    // Save the updated top scores to localStorage
    localStorage.setItem('scores', JSON.stringify(scores));
}

// Function to load and display the top scores
function loadTopScores() {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    for (let i = 0; i < 5; i++) {
        if (scores[i]) {
            document.getElementById(`topname${i + 1}`).textContent = scores[i].name;
            document.getElementById(`topscore${i + 1}`).textContent = scores[i].score;
        } else {
            document.getElementById(`topname${i + 1}`).textContent = 'xxx';
            document.getElementById(`topscore${i + 1}`).textContent = 'xxx';
        }
    }
}

// Function to open the register popup
function openRegisterPopup() {
    closeLoginPopup();
    document.getElementById("registerPopup").classList.add("active");
}

// Function to close the register popup
function closeRegisterPopup() {
    document.getElementById("registerPopup").classList.remove("active");
}

// Function to close the login popup
function closeLoginPopup() {
    document.getElementById("loginPopup").classList.remove("active");
}

// Event listener for the register form submission
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from being submitted

    // Get the values from the register form
    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    // Validate the username and password
    if (!newUsername || !newPassword) {
        alert("Username and password cannot be empty.");
        return;
    }

    // Verify if the user already exists
    if (userExists(newUsername)) {
        alert("The username is already in use. Please choose another one.");
        return;
    }

    // Initialize user data in localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username: newUsername, password: newPassword, score: 0, level: 'BRONZE' });
    localStorage.setItem('users', JSON.stringify(users));

    // Set the new user as the logged-in user
    localStorage.setItem('loggedInUser', newUsername);

    alert("User registered and logged in successfully!");
    closeRegisterPopup();

    // Update UI with new user info
    updateUserInfo(newUsername);
});

function userExists(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username === username);
}

// Event listener for the login form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from being submitted

    // Get the values from the login form
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate the username and password
    if (!username || !password) {
        alert("Username and password cannot be empty.");
        return;
    }

    // Verify if the user and password are correct
    if (isValidLogin(username, password)) {
        alert("Login successful. Welcome, " + username + "!");
        closeLoginPopup();

        // Store the logged-in user in localStorage
        localStorage.setItem('loggedInUser', username);

        // Update UI with logged-in user info
        updateUserInfo(username);
    } else {
        alert("Username or password incorrect. Please try again.");
    }
});

function isValidLogin(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    return user !== undefined;
}

function updateUserInfo(username) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = users.find(user => user.username === username);

    document.getElementById("points-count").textContent = `Player: ${username}, Points: ${game.score}`;
    document.querySelector('.user-level .points-level').textContent = currentUser.level;
    userLives = 3;
    updateLivesDisplay();
}

function togglePopup() {
    const popup = document.getElementById('legend-container');
    popup.classList.toggle('active');
}

function startLevel(level) {
    console.log('Starting level:', level);
    togglePopup();
}

function updateScoreDisplay() {
  document.getElementById("score").textContent = game.score;
}

function showStartPage() {
    $('.end-page').hide();
    $('#principal').hide();
    $('#initial-page').show();
    resetGame();
    newGame(); 
}